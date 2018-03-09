const _ = require('lodash')
const numeral = require('numeral')

// Setup numeral German
numeral.language('de', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: () => '.',
    currency: { symbol: '€' }
})

// Setup numeral Dutch
numeral.language('nl', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'mln',
        billion: 'mrd',
        trillion: 'bln'
    },
    ordinal: number => {
        let remainder = number % 100
        return (number !== 0 && remainder <= 1) || (remainder === 8 || remainder >= 20) ? 'ste' : 'de'
    },
    currency: { symbol: '€ ' }
})
numeral.defaultFormat('0,0.00')

/**
 * @author Rúben Gomes <ruben.gomes@timewax.com>
 * @classdesc Defines a NumberUtils static class. Responsible layer to provide number utility functions.
 */
class NumberUtils {
    /**
     * Check if the number is a valid number.
     * @static
     *
     * @param {!Object} [opts={}] Specifies the options object.
     * @param {?any} opts.number Specifies the number to be checked.
     *
     * @returns {Boolean} True if is a valid number, else returns false.
     */
    static isValidNumber({ number } = {}) {
        if (_.isNil(number)) { return false }
        if (_.isString(number)) {
            let numeric = parseFloat(number)
            return _.isFinite(numeric)
        }
        return _.isFinite(number)
    }

    /**
     * Parse the number as float number.
     * @static
     *
     * @param {!Object} [opts={}] Specifies the options object.
     * @param {!String|Number} opts.number Specifies the number to be parsed as float.
     *
     * @returns {Number} The number parsed as number
     */
    static parseNumber({ number } = {}) {
        return parseFloat(number)
    }

    /**
     * Gets the default number if the current number is not valid.
     * @static
     *
     * @param {!Object} [opts={}] Specifies the options object.
     * @param {?any} opts.number Specifies the number to be checked.
     * @param {!Number} [opts.defaultNumber=0] Specifies the default number.
     s*
     * @returns {Number} The default number or the current number as float if the validation was passed.
     */
    static getDefaultNumeric({ number, defaultNumber = 0 } = {}) {
        return NumberUtils.isValidNumber({ number }) ? NumberUtils.parseNumber({ number }) : NumberUtils.parseNumber({ number: defaultNumber })
    }

    /**
     * Formats a number using numeral format
     * @static
     *
     * @param {!Object} [opts={}] Specifies the options object.
     * @param {!Object} [opts.user={}] Specifies the number to be checked.
     * @param {!String|Number} opts.number Specifies the number to be parsed.
     * @param {!Object} [opts.myNumeral=numeral] Specifies the numeral instance.
     s*
     * @returns {String} The formated numeral number.
     */
    static formatNumber({ user = {}, number, myNumeral = numeral } = {}) {
        myNumeral.language(user.language || 'en')
        number = typeof number === 'string' ? parseFloat(number) : number
        return myNumeral(number).format()
    }
}

module.exports = exports = NumberUtils
