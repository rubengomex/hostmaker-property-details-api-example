/**
 * Defines properties routes for HostMaker api example
 * @author Rúben Gomes <ruben.gomes@timewax.com>
 */

const express = require('express')
// const versions = require('../versions/router')
const controller = require('./controller')
const router = new express.Router()

exports.routes = () => {
    router.route('/')
        .get(controller.findAll)
        .post(controller.create)

//    router.use('/:id/versions', versions)

    router.route('/:id')
        .get(controller.findById)
        .put(controller.update)
        .delete(controller.remove)

    return router
}
