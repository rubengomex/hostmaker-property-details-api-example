/**
 * Defines properties controller
 * @author Rúben Gomes <ruben.gomes@timewax.com>
 */

const Model = require('./model')

module.exports = { findAll, findById, create, update, remove }

/**
* @api {get} /properties Get all Properties
* @apiDescription Gets all properties in the HostMaker api example.
* @apiGroup Properties
* @apiVersion 0.0.1
*
* @apiUse defaultSuccessProperties
* @apiSuccess {Array} data Returns an array with all calculations based on query filters params.
* @apiSuccessExample {json} Response
* {
*    "status": true,
*    "message": '',
*    "data": [
*         {
*             id: '5E05EC07-E936-4600-9EC7-DB15627F5EB5',
*             host: 'Carlos',
*             address: 'Flat 5 7 Westbourne Terrace W2 3UL London U.K.'
*             airbnbId: 3512500,
*             numberOfBedrooms: 1,
*             numberOfBathrooms: 1,
*             incomeGenerated: 2000.34
*         },
*         ...
*    ]
* }
*
* @apiSuccessExample {json} Error Response
* {
*    "status": false,
*    "message": "Something went wrong",
*    "data": []
* }
*/
async function findAll(req, res, next) {
    try {
        const properties = await Model.findAll()
        res.reply(properties)
    } catch (err) {
        next(err)
    }
}

async function findById(req, res, next) {
    const { id } = req.params
    try {
        const property = await Model.findOne({ id })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}

async function create(req, res, next) {
    const { body } = req
    try {
        const property = await Model.create({ body })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}

async function update(req, res, next) {
    const { body, params: { id } } = req
    try {
        const property = await Model.update({ id, body })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}

async function remove(req, res, next) {
    const { id } = req.params
    try {
        const property = await Model.remove({ id })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}
