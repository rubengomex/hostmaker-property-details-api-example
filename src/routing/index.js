/**
 * Defines all the routes HostMaker api example
 * @author Rúben Gomes <gomesruben21@gmail.com>
 */

/**
 * @apiDefine defaultSuccessProperties
 *
 * @apiSuccess {Boolean} status true when execution is successful, false when something goes wrong
 * @apiSuccess {String} message A message with the error, an empty string when execution is successful
 */

/**
 * @apiDefine defaultErrorProperties
 * @apiError (Error 500) {Boolean} status true when execution is successful, false when something goes wrong
 * @apiError (Error 500) {String} message A message with the error, an empty string when execution is successful
 * @apiError (Error 500) {Array} data An empty array.
 */

/**
 * @apiDefine defaultErrorExample
 *
 * @apiErrorExample {json} Error Response
 *     HTTP/1.1 500 Server error
 *     {
 *         "status": false,
 *         "message": "Something went wrong",
 *         "data": []
 *     }
 *
 */

const express = require('express')
const properties = require('../api/properties/router')
const router = new express.Router()

exports.routes = () => {
    router.get('/', (req, res, next) => res.send({ message: 'HostMaker api example' }))
    router.use('/properties', properties.routes())

    return router
}
