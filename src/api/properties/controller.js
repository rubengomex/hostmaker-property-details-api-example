/**
 * Defines properties controller
 * @author Rúben Gomes <gomesruben21@gmail.com>
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
* @apiUse defaultErrorProperties
* @apiSuccess {Array} data Returns an array of properties object.
* @apiSuccessExample {json} Response
* HTTP/1.1 200 OK
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
* @apiUse defaultErrorExample
*/
async function findAll(req, res, next) {
    try {
        const properties = await Model.findAll()
        res.reply(properties)
    } catch (err) {
        next(err)
    }
}

/**
* @api {get} /properties/:id Get property by id
* @apiDescription Gets a specific property.
* @apiGroup Properties
* @apiVersion 0.0.1
* @apiParam {String} id Specifies the id of the property to fetch.
*
* @apiUse defaultSuccessProperties
* @apiUse defaultErrorProperties
* @apiSuccess {Object} data Returns a property object.
* @apiSuccessExample {json} Response
* HTTP/1.1 200 OK
* {
*    "status": true,
*    "message": '',
*    "data": {
*         id: '5E05EC07-E936-4600-9EC7-DB15627F5EB5',
*         host: 'Carlos',
*         address: 'Flat 5 7 Westbourne Terrace W2 3UL London U.K.'
*         airbnbId: 3512500,
*         numberOfBedrooms: 1,
*         numberOfBathrooms: 1,
*         incomeGenerated: 2000.34
*     }
* }
*
* @apiUse defaultErrorExample
*/
async function findById(req, res, next) {
    const { id } = req.params
    try {
        const property = await Model.findOne({ id })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}

/**
* @api {post} /properties Adds a property
* @apiDescription Creates a property.
* @apiGroup Properties
* @apiVersion 0.0.1
*
* @apiParam (Body) {String} host Specifies the host of the property.
* @apiParam (Body) {String} address Specifies the address of the property.
* @apiParam (Body) {String} address.line1 Specifies the line 1 of the address.
* @apiParam (Body) {String} [address.line2=''] Specifies the line 2 of the address .
* @apiParam (Body) {String} [address.line3=''] Specifies the line 3 of the address.
* @apiParam (Body) {String} address.line4 Specifies the line 4 of the address.
* @apiParam (Body) {String} address.postCode Specifies the postcode.
* @apiParam (Body) {String} address.city Specifies the city.
* @apiParam (Body) {String} address.country Specifies the country.
* @apiParam (Body) {Number} numberOfBedrooms Specifies the number of the bedrooms.
* @apiParam (Body) {Number} numberOfBathrooms Specifies the number of bathrooms.
* @apiParam (Body) {Number} airbnbId Specifies the airbnb id of the property.
* @apiParam (Body) {Number} incomeGenerated Specifies the income generated.
*
* @apiUse defaultSuccessProperties
* @apiUse defaultErrorProperties
*
* @apiParamExample {json} Request Example:
* {
*     host: 'Carlos',
*     "address": {
*         "line1": "Flat 5",
*         "line4": "7 Westbourne Terrace",
*         "postCode": "W2 3UL",
*         "city": "London",
*         "country": "U.K."
*     },
*     numberOfBedrooms: 1,
*     numberOfBathrooms: 1,
*     airbnbId: 3512500,
*     incomeGenerated: 2000.34
* }
* @apiSuccess {Object} data Returns a property object.
* @apiSuccessExample {json} Response
* HTTP/1.1 200 OK
* {
*    "status": true,
*    "message": '',
*    "data": {
*         id: '5E05EC07-E936-4600-9EC7-DB15627F5EB5',
*         host: 'Carlos',
*         address: 'Flat 5 7 Westbourne Terrace W2 3UL London U.K.'
*         airbnbId: 3512500,
*         numberOfBedrooms: 1,
*         numberOfBathrooms: 1,
*         incomeGenerated: 2000.34
*     }
* }
*
* @apiUse defaultErrorExample
*/
async function create(req, res, next) {
    const { body } = req
    try {
        const property = await Model.create({ body })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}

/**
* @api {put} /properties/:id Update a property
* @apiDescription Updates a property.
* @apiGroup Properties
* @apiVersion 0.0.1
*
* @apiParam {String} id Specifies the id of the property to update.
* @apiParam (Body) {String} [host] Specifies the host of the property.
* @apiParam (Body) {String} [address] Specifies the address of the property.
* @apiParam (Body) {String} [address.line1] Specifies the line 1 of the address.
* @apiParam (Body) {String} [address.line2] Specifies the line 2 of the address.
* @apiParam (Body) {String} [address.line3] Specifies the line 3 of the address.
* @apiParam (Body) {String} [address.line4] Specifies the line 4 of the address.
* @apiParam (Body) {String} [address.postCode] Specifies the postcode.
* @apiParam (Body) {String} [address.city] Specifies the city.
* @apiParam (Body) {String} [address.country] Specifies the country.
* @apiParam (Body) {Number} [numberOfBedrooms] Specifies the number of the bedrooms.
* @apiParam (Body) {Number} [numberOfBathrooms] Specifies the number of bathrooms.
* @apiParam (Body) {Number} [airbnbId] Specifies the airbnb id of the property.
* @apiParam (Body) {Number} [incomeGenerated] Specifies the income generated.
*
* @apiUse defaultSuccessProperties
* @apiUse defaultErrorProperties
*
* @apiParamExample {json} Request Example:
* {
*     host: 'John',
*     numberOfBedrooms: 2,
*     airbnbId: 3512500,
*     incomeGenerated: 3000.34
* }
* @apiSuccess {Object} data Returns a property object.
* @apiSuccessExample {json} Response
* HTTP/1.1 200 OK
* {
*    "status": true,
*    "message": '',
*    "data": {
*         id: '5E05EC07-E936-4600-9EC7-DB15627F5EB5',
*         host: 'John',
*         address: 'Flat 5 7 Westbourne Terrace W2 3UL London U.K.'
*         airbnbId: 3512500,
*         numberOfBedrooms: 2,
*         numberOfBathrooms: 1,
*         incomeGenerated: 3000.34
*     }
* }
*
* @apiUse defaultErrorExample
*/
async function update(req, res, next) {
    const { body, params: { id } } = req
    try {
        const property = await Model.update({ id, body })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}

/**
* @api {delete} /properties/:id Removes property by id
* @apiDescription Removes a specific property.
* @apiGroup Properties
* @apiVersion 0.0.1
* @apiParam {String} id Specifies the id of the property to remove.
*
* @apiUse defaultSuccessProperties
* @apiUse defaultErrorProperties
* @apiSuccess {Object} data Returns a property object.
* @apiSuccessExample {json} Response
* HTTP/1.1 200 OK
* {
*    "status": true,
*    "message": '',
*    "data": []
* }
*
* @apiUse defaultErrorExample
*/
async function remove(req, res, next) {
    const { id } = req.params
    try {
        const property = await Model.remove({ id })
        res.reply(property)
    } catch (err) {
        next(err)
    }
}
