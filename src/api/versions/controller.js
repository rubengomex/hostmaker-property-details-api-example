/**
 * Defines properties controller
 * @author Rúben Gomes <gomesruben21@gmail.com>
 */

const VersionModel = require('./model')

module.exports = { findPropertyVersions }

/**
* @api {get} /properties/:id/versions Get a property versions
* @apiDescription Get all versions for a specific versions.
* @apiGroup Versions
* @apiVersion 0.0.1
*
* @apiParam {String} id Specifies the id of the property that will be use to fetch the attached versions.
*
* @apiUse defaultSuccessProperties
* @apiUse defaultErrorProperties
* @apiSuccess {Array} data Returns an array of versions for a specific property object.
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
*             incomeGenerated: 2000.34,
*             version: 2
*         },
*         ...
*    ]
* }
*
* @apiUse defaultErrorExample
*/
async function findPropertyVersions(req, res, next) {
    console.log(req.params)
    const { id: propertyId } = req.params
    console.log(propertyId)
    try {
        const versions = await VersionModel.findAll({ propertyId })
        res.reply(versions)
    } catch (err) {
        next(err)
    }
}
