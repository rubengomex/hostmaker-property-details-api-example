const Model = require('../../model')
// const queries = require('./queries')

// Add logic to retrieve all versions for a specific property
class VersionModel extends Model {
    constructor({ name, Connection }) {
        super({ name })
    }

    async findAll({ propertyId }) {
        return [{ property: '2', version: 1 }]
    }
}

module.exports = exports = new VersionModel({ name: 'Version' })
