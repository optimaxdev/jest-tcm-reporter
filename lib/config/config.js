const { getPersonalConfig, validateConfig } = require('./config-file');

const config = validateConfig(getPersonalConfig());

module.exports = {
    config,
};
