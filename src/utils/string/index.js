const _ = require('lodash')

/**
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @classdesc Defines a StringUtils static class. Responsible layer to provide string utility functions.
 */
class StringUtils {
    /**
     * Check if the value is a valid string.
     * @static
     *
     * @param {!Object} opts Specifies the options object.
     * @param {!any} [opts.value] Specifies the value to be checked.
     *
     * @returns {Boolean} True if is a valid string, else returns false.
     */
    static isValidString({ value } = {}) {
        return !_.isNil(value) && _.isString(value) && !_.isEmpty(value)
    }

    /**
     * Gets the default string value if the current value isn't a valid string.
     * @static
     *
     * @param {!Object} opts Specifies the options object.
     * @param {!any} [opts.value] Specifies the value to be checked.
     * @param {!String} [opts.defaultValue='0'] Specifies the default value.
     *
     * @returns {String} The default string value or the current value if the validation was passed.
     */
    static getDefaultString({ value, defaultValue = '0' } = {}) {
        return StringUtils.isValidString({ value }) ? value : defaultValue
    }
}

module.exports = exports = StringUtils
