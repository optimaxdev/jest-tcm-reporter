const {
    getTestKey,
    formatStatus,
    getRelativePath,
    reportException,
    formingScripts,
    formingSteps,
} = require('./helpers/case');

/**
 * Formats data test suites.
 *
 * @param {Object} testSuitesResult - Test suite.
 * @param {string} path - Test path.
 * @param {Object} data - Accumulator for results.
 * @returns {Object} Result of the test suite.
 */
const recordTestResults = dataResult => {
    const { testResults, relativePath, perfStats } = dataResult;

    return testResults.reduce((accumulator, test) => {
        const { title, status, duration } = test;
        const { end } = perfStats;
        const key = getTestKey(title);
        const newTestData = {
            title,
            status: formatStatus(status),
            path: relativePath,
            duration,
            finishDate: new Date(end),
        };

        if (!key) {
            reportException(title);
            return false;
        }

        return {
            ...accumulator,
            ...(Object.prototype.hasOwnProperty.call(accumulator, key)
                ? { [key]: [...accumulator[key], newTestData] }
                : { [key]: [newTestData] }),
        };
    }, {});
};

/**
 * Formats data about test results.
 *
 * @param {Object} testResults - Tests reports.
 * @returns {Object} Formatted test result data.
 */
const getTestResults = ({ testResults }) =>
    testResults.reduce((accumulator, testSuites) => {
        const { testResults: result, testFilePath, perfStats } = testSuites;
        const relativePath = getRelativePath(testFilePath);
        const formatedTestResults = recordTestResults({
            testResults: result,
            relativePath,
            perfStats,
        });

        return { ...accumulator, ...formatedTestResults };
    }, {});

module.exports = {
    recordTestResults,
    getTestResults,
    formingScripts,
    formingSteps,
};
