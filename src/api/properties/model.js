const Model = require('../../model')
// const queries = require('./queries')

// TODO: Validate params and body
// Add logic to retrieve already the property object
class PropertyModel extends Model {
    constructor({ name, Connection }) {
        super({ name })
    }

    async findAll() {
        return [{ property: '2' }]
    }

    async findOne({ id }) {
        return { property: 1 }
    }

    async create({ body }) {
        return { property: 'created' }
    }

    async update({ id, body }) {
        return { property: 'updated' }
    }

    async remove({ id }) {
        return { property: 'removed' }
    }
}

module.exports = exports = new PropertyModel({ name: 'Property' })
