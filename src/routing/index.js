/**
 * Defines all the routes HostMaker api example
 * @author Rúben Gomes <gomesruben21@gmail.com>
 */

const express = require('express')
const properties = require('../api/properties/router')
const router = new express.Router()

exports.routes = () => {
     router.get('/', (req, res, next) => res.send({ message: 'HostMaker api example' }))
     router.use('/properties', properties.routes())

     return router
}
