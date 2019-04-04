const JoyCon = require('joycon');
const path = require('path');
const Ajv = require('ajv');
const configSchema = require('./config-schema.json');

const CONFIG_FILES = ['jest-tcm.config.js', 'package.json'];
const ajv = new Ajv();
const joycon = new JoyCon();

/**
 * Config scheme validation
 *
 * @property {Object} config - Config
 * @returns {Object} Config
 * @throws {Error} If the config failed validation
 */
const validateConfig = config => {
    ajv.validate(configSchema, config);
    if (ajv.errors) {
        throw Error(JSON.stringify(ajv.errors, null, 2));
    }
    return config;
};

/**
 * Get personal config
 *
 * @returns {Object} Personal config
 */
const getPersonalConfig = () => {
    const result = joycon.loadSync(CONFIG_FILES);
    const extname = path.extname(result.path);
    switch (extname) {
        case '.js':
            return result.data;
        case '.json':
            return result.data['jest-tcm'];
        default:
            return {};
    }
};

module.exports = {
    validateConfig,
    getPersonalConfig,
};
