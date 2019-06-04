const { api } = require('../../api');
const { config } = require('../../config/config');
const {
    reportException,
    getTestKey,
    formatStatus,
    getRelativePath,
    getStatus,
    formingSteps,
} = require('./common');

/**
 * Separate test key to key and version.
 *
 * @param {string} testKey - Test key.
 * @returns {{version: string, key: string}} Separated key and version.
 */
const getTestKeyVersion = testKey => {
    const result = RegExp(/(.*?)(?:\((.*)\))/).exec(testKey);
    return {
        key: (result[1] || '').trim(),
        version: (result[2] || '').trim(),
    };
};

/**
 * Get script errors.
 *
 * @param {Array} testResult - Result of the test case.
 * @returns {Object} Script errors for JTM.
 */
const getScriptErrors = testResult => testResult.map(testCase => testCase.comment).join('\n');

/**
 * Form whitelist according to query in config file.
 *
 * @returns {Promise<Object>} - Key-version map.
 */
const getTestCaseWhitelist = async () =>
    (await api.testCase.search(config.whitelist.query || '')).reduce(
        (whitelist, testCase) => ({ ...whitelist, [testCase.key]: testCase.majorVersion }),
        {},
    );

/**
 * Format result for Test Cycles.
 *
 * @param {Object} testResults - Test result data.
 * @returns {Array} List with the result.
 */
const formingScripts = async testResults => {
    const whitelistEnabled = config.whitelist && config.whitelist.enabled;
    const checkVersion = config.whitelist && config.whitelist.checkVersion;

    let whitelist;
    if (whitelistEnabled) whitelist = await getTestCaseWhitelist();

    const resultsList = [];
    Object.entries(testResults).forEach(test => {
        const [key, value] = test;
        const { key: testKey, version: testVersion } = getTestKeyVersion(key);

        let status = 'Blocked';
        if (
            !whitelistEnabled ||
            (whitelist[testKey] &&
                (!checkVersion || Number(whitelist[testKey]) === Number(testVersion)))
        ) {
            status = getStatus(value);
        }

        const scriptErrors = getScriptErrors(value);
        resultsList.push({
            status,
            testCaseKey: testKey,
            scriptResults: [],
            comment: `<pre>${scriptErrors}</pre>`,
        });
    });
    return resultsList;
};

module.exports = {
    reportException,
    getTestKey,
    formatStatus,
    getRelativePath,
    formingScripts,
    formingSteps,
};
