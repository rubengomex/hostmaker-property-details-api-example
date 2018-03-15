const nunjucks = require('nunjucks')
const { NumberUtils, StringUtils, GenericUtils } = require('../../utils')
const Model = require('../../model')
const VersionModel = require('../versions/model')
const Queries = require('./queries')

class PropertyModel extends Model {
    constructor({ name, Connection, validAirbnbIds = [] }) {
        super({ name })
        this.validAirbnbIds = validAirbnbIds
    }

    async findAll() {
        const properties = super.find({ sql: nunjucks.renderString(Queries.find(), {}) })
        return properties
    }

    async findOne({ id }) {
        const property = await super.findOne({ sql: nunjucks.renderString(Queries.find(), { id }), params: { id } })
        return property
    }

    async create({ body }) {
        body = { id: GenericUtils.getNewId(), ...this.checkValidData(body) }

        await super.create({ sql: Queries.create(), params: body })
        const createdProperty = await this.findOne({ id: body.id })
        await VersionModel.create(createdProperty) // creates a new version starting from 1
        return createdProperty
    }

    async update({ id, body }) {
        const property = await this.findOne({ id })
        if (!property) { throw new Error(this.locales.propertyDoesNotExist) }

        body = { ...this.parseValidUpdateData({...body, property}) }
        await super.update({ sql: Queries.update(), params: { ...body, id } })
        const updatedProperty = await this.findOne({ id })

        await VersionModel.create(updatedProperty) // creates a new version and up the version number
        return updatedProperty
    }

    async remove({ id }) {
        const deletedProperty = await this.findOne({ id })
        await Promise.all([
            super.remove({ sql: Queries.remove(), params: { id } }),
            VersionModel.removeAll({ propertyId: id })
        ])

        return deletedProperty
    }

    checkValidData({ host, address, numberOfBedrooms, numberOfBathrooms, airbnbId, incomeGenerated }) {
        const hostValid = StringUtils.isValidString({ value: host })
        const numberOfBedroomsValid = NumberUtils.isValidNumber({ number: numberOfBedrooms })
        const numberOfBathroomsValid = NumberUtils.isValidNumber({ number: numberOfBathrooms })
        const incomeGeneratedValid = NumberUtils.isValidNumber({ number: incomeGenerated })
        const addressValid = address && (typeof address === 'object')

        if (!hostValid) { throw new Error(this.locales.hostIsMandatoryOrInvalid) }
        if (!numberOfBedroomsValid || (numberOfBedroomsValid && numberOfBedroomsValid < 1)) { throw new Error(this.locales.numberOfBedroomsInvalidOrLessThanOne) }
        if (!numberOfBathroomsValid || (numberOfBathroomsValid && numberOfBathrooms < 1)) { throw new Error(this.locales.numberOfBathroomsInvalidOrLessThanOne) }
        if (!this.airbnbIdIsValid(airbnbId)) { throw new Error(this.locales.airbnbIdIsInvalid) }
        if (!incomeGeneratedValid || (incomeGeneratedValid && incomeGenerated <= 0)) { throw new Error(this.locales.incomeGeneratedIsInvalidOrLessEqualThanZero) }
        if (!addressValid) { throw new Error(this.locales.addressIsInvalid) }

        let { line1, line2, line3, line4, postCode, city, country } = address

        if (!StringUtils.isValidString({ value: line1 })) { throw new Error(this.locales.line1IsMandatoryOrInvalid) }
        if (!StringUtils.isValidString({ value: line4 })) { throw new Error(this.locales.line4IsMandatoryOrInvalid) }
        if (!StringUtils.isValidString({ value: postCode })) { throw new Error(this.locales.postCodeIsMandatoryOrInvalid) }
        if (!StringUtils.isValidString({ value: city })) { throw new Error(this.locales.cityIsMandatoryOrInvalid) }
        if (!StringUtils.isValidString({ value: country })) { throw new Error(this.locales.countryIsMandatoryOrInvalid) }

        line2 = StringUtils.getDefaultString({ value: line2, defaultValue: '' })
        line3 = StringUtils.getDefaultString({ value: line3, defaultValue: '' })

        const parsedAddress = this.parseAddress({ line1, line2, line3, line4, postCode, city, country })

        return { host, address: parsedAddress, numberOfBedrooms, numberOfBathrooms, airbnbId, incomeGenerated }
    }

    airbnbIdIsValid(airbnbId) { // TODO: check also with axios module if the airbnbId is valid in hostMaker is valid store it in session to after check the valid ones without fetching another http request to hostMaker(it blocks ip)
        return NumberUtils.isValidNumber({ number: airbnbId })
    }

    parseAddress(address) {
        const keys = Object.keys(address)
        return keys.map(key => address[key])
            .filter(v => v && v !== '')
            .join(' ')
    }

    parseValidUpdateData({ host, address, numberOfBedrooms, numberOfBathrooms, airbnbId, incomeGenerated, property }) {
        const hostValid = StringUtils.isValidString({ value: host })
        const numberOfBedroomsValid = NumberUtils.isValidNumber({ number: numberOfBedrooms })
        const numberOfBathroomsValid = NumberUtils.isValidNumber({ number: numberOfBathrooms })
        const incomeGeneratedValid = NumberUtils.isValidNumber({ number: incomeGenerated })
        const addressValid = address && (typeof address === 'object')
        const overrideValues = {}

        if (hostValid) { overrideValues.host = host }
        if (numberOfBedroomsValid && numberOfBedroomsValid >= 1) { overrideValues.numberOfBedrooms = numberOfBedrooms }
        if (numberOfBathroomsValid && numberOfBathrooms >= 1) { overrideValues.numberOfBathrooms = numberOfBathrooms }
        if (this.airbnbIdIsValid(airbnbId)) { overrideValues.airbnbId = airbnbId }
        if (incomeGeneratedValid && incomeGenerated > 0) { overrideValues.incomeGenerated = incomeGenerated }
        if (!addressValid) { return { ...property, ...overrideValues } }

        let { line1, line2, line3, line4, postCode, city, country } = address

        if (!StringUtils.isValidString({ value: line1 }) ||
            !StringUtils.isValidString({ value: line4 }) ||
            !StringUtils.isValidString({ value: postCode }) ||
            !StringUtils.isValidString({ value: city }) ||
            !StringUtils.isValidString({ value: country })
        ) { return { ...property, ...overrideValues } }

        line2 = StringUtils.getDefaultString({ value: line2, defaultValue: '' })
        line3 = StringUtils.getDefaultString({ value: line3, defaultValue: '' })

        overrideValues.address = this.parseAddress({ line1, line2, line3, line4, postCode, city, country })

        return { ...property, ...overrideValues }
    }
}

module.exports = exports = new PropertyModel({ name: 'Property' })
