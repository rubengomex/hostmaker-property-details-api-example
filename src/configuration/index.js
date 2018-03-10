const config = require('../config')

/**
 * @author Rúben Gomes <ruben.gomes@timewax.com>
 * @classdesc Defines a Configuration static class. Responsible layer to get the configuration properties.
 */
class Configuration {
    /**
     * Gets the configuration based on a key.
     *
     * @static
     * @param {?String} [key] Specifies the key to the specific configuration
     * @returns {Object|String|Number} The configuration.
     */
    static get(key) {
        return process.env[key] || config[key]
    }
}

module.exports = exports = Configuration
