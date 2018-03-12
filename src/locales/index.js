const locales = {
    pt: {
        propertyDoesNotExist: 'Property does not exists',
        numberOfBedroomsInvalidOrLessThanOne: 'Number of bedrooms is invalid or less than 1',
        numberOfBathroomsInvalidOrLessThanOne: 'Number of bathrooms is invalid or less than 1',
        airbnbIdIsInvalid: 'Airbnb id is invalid',
        incomeGeneratedIsInvalidOrLessEqualThanZero: 'Income generate is invalid or is less or equal to 0',
        addressIsInvalid: 'Address is invalid',
        line1IsMandatoryOrInvalid: 'Line 1 of the address is invalid. Line 1 is mandatory',
        line4IsMandatoryOrInvalid: 'Line 4 of the address is invalid. Line 4 is mandatory',
        postCodeIsMandatoryOrInvalid: 'Post code is invalid. Also it is mandatory',
        cityIsMandatoryOrInvalid: 'City is invalid. Also it is mandatory',
        countryIsMandatoryOrInvalid: 'Country is invalid. Country it is mandatory',
        theSocketIsClosed: 'This socket is closed'
    },
    en: {
        propertyDoesNotExist: 'Property does not exists',
        numberOfBedroomsInvalidOrLessThanOne: 'Number of bedrooms is invalid or less than 1',
        numberOfBathroomsInvalidOrLessThanOne: 'Number of bathrooms is invalid or less than 1',
        airbnbIdIsInvalid: 'Airbnb id is invalid',
        incomeGeneratedIsInvalidOrLessEqualThanZero: 'Income generate is invalid or is less or equal to 0',
        addressIsInvalid: 'Address is invalid',
        line1IsMandatoryOrInvalid: 'Line 1 of the address is invalid. Line 1 is mandatory',
        line4IsMandatoryOrInvalid: 'Line 4 of the address is invalid. Line 4 is mandatory',
        postCodeIsMandatoryOrInvalid: 'Post code is invalid. Also it is mandatory',
        cityIsMandatoryOrInvalid: 'City is invalid. Also it is mandatory',
        countryIsMandatoryOrInvalid: 'Country is invalid. Country it is mandatory',
        theSocketIsClosed: 'This socket is closed'
    }
}

module.exports = {
    get: language => locales[language || 'en']
}
