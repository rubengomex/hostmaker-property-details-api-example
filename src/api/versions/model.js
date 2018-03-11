const Model = require('../../model')
const { GenericUtils } = require('../../utils')
const Queries = require('./queries')

// Add logic to retrieve all versions for a specific property
class VersionModel extends Model {
    constructor({ name, Connection }) {
        super({ name })
    }

    async findAll({ propertyId }) {
        const versions = await super.find({ sql: Queries.findPropertyVersions(), params: { propertyId } })
        return versions
    }

    async findLastVersion({ propertyId }) {
        const content = await super.findOne({ sql: Queries.findLastVersion(), params: { propertyId } })
        if (!content) { return 0 }
        return content.version
    }

    async create({ id: propertyId, host, address, numberOfBedrooms, numberOfBathrooms, airbnbId, incomeGenerated }) {
        const lastVersion = await this.findLastVersion({ propertyId })
        const params = { id: GenericUtils.getNewId(), propertyId, host, address, numberOfBedrooms, numberOfBathrooms, airbnbId, incomeGenerated, version: lastVersion + 1 }
        await super.create({ sql: Queries.create(), params })
        return []
    }
}

module.exports = exports = new VersionModel({ name: 'Version' })
