const rgAsync = require('rg-async')
const config = require('../src/configuration')
const { MySqlRunner } = require('../src/database')
const queries = require('./queries')
const data = require('./exerciseData')
const db = config.get('DB_NAME')
const tables = config.get('TABLE_NAMES')
const dbRunner = new MySqlRunner()

module.exports = { reset, drop, create, addTables, cleanTables, cleanTable, addTablesContent, addTableContent }

async function reset({ dbName = db }) {
    await drop({ dbName })
    await create({ dbName, cleanTable })
}

async function drop({ dbName = db }) {
    await dbRunner.run({ sql: queries.dropDb(), params: { dbName }, attempts: 1 })
}

async function create({ dbName = db } = {}) {
    await dbRunner.run({ sql: queries.createDb(), params: { dbName }, attempts: 1 })
    await addTables()
}

async function addTables({ tableNames = tables, content = data } = {}) {
    await rgAsync.each(tables, async (tableName) => {
        await dbRunner.run({ sql: queries.createTable(), params: { tableName }, attempts: 1 })
        await cleanTable({ tableName })
        await addTableContent({
            tableName,
            body: tableName === 'property_version' ? content['properties'] : content[tableName] })
    })
}

async function cleanTables({ tableNames = tables } = {}) {
    await rgAsync.each(tables, async (tableName) => {
        await cleanTable({ tableName })
    })
}

async function cleanTable({ tableName }) {
    await dbRunner.run({ sql: queries.cleanTable(), params: { tableName }, attempts: 1 })
}

async function addTablesContent({ content = data, tableNames = tables } = {}) {
    await rgAsync.each(tableNames, async (tableName) => {
        const dataToAdd = content[tableName]
        await addTableContent({ tableName, body: dataToAdd })
    })
}

async function addTableContent({ tableName, body }) {
    const insertTableContentQuery = queries.getInsertTableContentQuery({ tableName })
    if (!body.address) {
        await dbRunner.run({ sql: insertTableContentQuery, params: body, attempts: 1 })
        return
    }

    const addressKeys = Object.keys(body.address)
    const concatAddress = addressKeys.reduce((acc, key) => {
        acc += body.address[key]
        return acc
    }, '')

    await dbRunner({ sql: insertTableContentQuery, params: { ...body, address: concatAddress }, attempts: 1 })
}

if (require.main === module) {
    reset().then(() => {
        console.info(`Setup ${db} database successfully!`)
    }).catch(err => {
        console.error('An error occurs with setup process')
        console.error(err)
    })
}
