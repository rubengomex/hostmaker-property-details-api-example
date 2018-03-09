const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('../lib/configuration')
const MiddlewareHelper = require('../lib/middlewares')
const router = require('./routing')
const port = config.get('PORT') || 3000
const env = config.get('ENV')
const app = express()

app.use(helmet())
app.use(MiddlewareHelper.addCorsHeaders)
if(env && (env === 'dev' || env === 'development')){
    app.use(logger('short'))
}
app.use(bodyParser.json())
app.use(MiddlewareHelper.jsonInvalid)
app.use(MiddlewareHelper.replyProvider)
app.use('/', router.routes())
app.use(MiddlewareHelper.logErrors)
app.use(MiddlewareHelper.errorHandler)

exports.start = async () => {
    try {
        await app.listen(port)
        console.log(`Connected on port: ${port}`)
    } catch(err) {
        console.log('Something went wrong')
        console.log(err)
    }
}
