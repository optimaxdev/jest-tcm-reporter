/**
 * Warns about missing key.
 *
 * @param {string} title - Test title.
 */
const reportException = title =>
    console.log('\x1b[36m%s\x1b[0m', `Test "${title}" isn't attached to Jira Test Manager`); // eslint-disable-line no-console

/**
 * Extract key from text title.
 *
 * @param {string} title - Test title.
 * @returns {string} Test key.
 */
const getTestKey = title => (RegExp(/\[(.*?)\]/).exec(title) || '')[1];

/**
 * Formats status.
 *
 * @param {string} status - Default status of repors.
 * @returns {string} Formats status.
 */
const formatStatus = status => `${status[0].toUpperCase()}${status.substring(1, 4)}`;

/**
 * Converts the full path to a relative path.
 *
 * @param {string} fullPath - Full path to the file.
 * @returns {string} Path relative to the project.
 */
const getRelativePath = fullPath =>
    fullPath.substring(fullPath.indexOf('/__analytics__/'), fullPath.length);

/**
 * Formats data test suites.
 *
 * @param {Object} dataResult - Test test tes.
 * @returns {String} Result of the test suite.
 */
const getTestName = test => test.testResults[0].ancestorTitles[0];

module.exports = {
    reportException,
    getTestKey,
    formatStatus,
    getRelativePath,
    getTestName
}