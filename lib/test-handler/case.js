const { getTestKey, formatStatus, getRelativePath, reportException } = require('./helpers')

/**
 * Formats data test suites.
 *
 * @param {Object} testSuitesResult - Test suite.
 * @param {string} path - Test path.
 * @param {Object} data - Accumulator for results.
 * @returns {Object} Result of the test suite.
 */
const recordTestResults = (testSuitesResult, path, data = {}) =>
    testSuitesResult.reduce((accumulator, test) => {
        const { title, status } = test;
        const key = getTestKey(title);

        if (!key) {
            reportException(title);
            return false;
        }

        if (Object.prototype.hasOwnProperty.call(data, key)) {
            data[key].push({
                title,
                status: formatStatus(status),
                path,
            });
        } else {
            Object.assign(data, {
                [key]: [
                    {
                        title,
                        status: formatStatus(status),
                        path,
                    },
                ],
            });
        }

        return { ...accumulator, data };
    }, data);

/**
 * Formats data about test results.
 *
 * @param {Object} testResults - Tests reports.
 * @returns {Object} Formatted test result data.
 */
const getTestResults = ({ testResults }) =>
    testResults.reduce((accumulator, testSuites) => {
        const { testResults: results, testFilePath } = testSuites;
        const relativePath = getRelativePath(testFilePath);
        recordTestResults(results, relativePath, accumulator);

        return { ...accumulator };
    }, {});

module.exports = {
    recordTestResults,
    getTestResults
}