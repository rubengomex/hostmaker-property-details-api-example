const _ = require('lodash')
const nunjucks = require('nunjucks')
const rgAsync = require('rg-async')
const config = require('../src/configuration')
const { MySqlRunner } = require('../src/database')
const { GenericUtils } = require('../src/utils')
const queries = require('./queries')
const data = require('./exerciseData')
const db = config.get('DB_NAME')
const tables = config.get('TABLE_NAMES')
let dbRunner = new MySqlRunner({ user: { db: '' } })

module.exports = { reset, drop, create, addTables, cleanTables, cleanTable, addTablesContent, addTableContent }

async function reset({ dbName = db } = {}) {
    await drop({ dbName })

    await create({ dbName, cleanTable })
}

async function drop({ dbName = db }) {
    await dbRunner.run({ sql: nunjucks.renderString(queries.dropDb(), { dbName }), attempts: 1 })
}

async function create({ dbName = db } = {}) {
    await dbRunner.run({ sql: nunjucks.renderString(queries.createDb(), { dbName }), attempts: 1 })
    dbRunner = new MySqlRunner() // I need to reset the mysql runner to set database for hostmaker_example
    await addTables()
}

async function addTables({ tableNames = tables, content = data } = {}) {
    await rgAsync.each(tables, async (tableName) => {
        let methodToCall = _.camelCase(`create ${tableName}Table`)
        const createSql = queries[methodToCall]
        if (!createSql) { return }

        await dbRunner.run({ sql: createSql(), attempts: 1 })
        await cleanTable({ tableName })
        await addTableContent({
            tableName,
            body: _.camelCase(tableName) === 'propertyVersions' ? content['properties'] : content[_.camelCase(tableName)] })
    })
}

async function cleanTables({ tableNames = tables } = {}) {
    await rgAsync.each(tables, async (tableName) => {
        await cleanTable({ tableName })
    })
}

async function cleanTable({ tableName }) {
    const methodToCall = _.camelCase(`clean ${tableName}Table`)
    const cleanSql = queries[methodToCall]
    if (!cleanSql) { return }
    await dbRunner.run({ sql: cleanSql(), attempts: 1 })
}

async function addTablesContent({ content = data, tableNames = tables } = {}) {
    await rgAsync.each(tableNames, async (tableName) => {
        const dataToAdd = content[_.camelCase(tableName)]
        await addTableContent({ tableName, body: dataToAdd })
    })
}

async function addTableContent({ tableName, body }) {
    if (_.camelCase(tableName) === 'propertyVersions') {
        body = body.map(obj => {
            const newObj = { ...obj }
            newObj.propertyId = obj.id
            newObj.id = GenericUtils.getNewId()
            newObj.version = 1
            return newObj
        })
    }

    const methodToCall = _.camelCase(`insert ${tableName}TableContent`)
    const insertTableContentQuery = queries[methodToCall]
    if (!insertTableContentQuery) { return }

    await rgAsync.each(body, async params => {
        if (!params.address) {
            await dbRunner.run({ sql: insertTableContentQuery(), params, attempts: 1 })
            return
        }

        const addressKeys = Object.keys(params.address)
        const concatAddress = addressKeys.map(key => params.address[key]).join(' ')
        console.log({ ...params, address: concatAddress })

        await dbRunner.run({ sql: insertTableContentQuery(), params: { ...params, address: concatAddress }, attempts: 1 })
    })
}

if (require.main === module) {
    reset().then(() => {
        console.info(`Setup ${db} database successfully!`)
    }).catch(err => {
        console.error('An error occurs with setup process')
        console.error(err)
    })
}
