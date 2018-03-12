/**
 * Defines properties routes for HostMaker api example
 * @author Rúben Gomes <gomesruben21@gmail.com>
 */

const express = require('express')
const versionsController = require('../versions/controller')
const controller = require('./controller')
const router = new express.Router()

exports.routes = () => {
    router.route('/')
        .get(controller.findAll)
        .post(controller.create)

    router.get('/:id/versions', versionsController.findPropertyVersions)

    router.route('/:id')
        .get(controller.findById)
        .put(controller.update)
        .delete(controller.remove)

    return router
}
