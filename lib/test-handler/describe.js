const {
    getTestKey,
    getTestName,
    formatStatus,
    getRelativePath,
    reportException,
    formingScripts
} = require('./helpers');

/**
 * Formats data test suites.
 *
 * @namespace
 * @param {Object} dataResult - Test test tes.
 * @property {Object} dataResult.testResults - Test suite.
 * @property {string} dataResult.relativePath - Test path.
 * @property {Object} dataResult.perfStats - Test date.
 * @returns {Object} Result of the test suite.
 */
const recordTestResults = dataResult => {
    const { testResults, relativePath, perfStats } = dataResult;
    const name = getTestKey(getTestName(dataResult));

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
            key,
        };

        if (!key) {
            reportException(title);
            return accumulator;
        }

        return {
            ...accumulator,
            ...(Object.prototype.hasOwnProperty.call(accumulator, name)
                ? { [name]: [...accumulator[name], newTestData] }
                : { [name]: [newTestData] }),
        };
    }, {});
};

/**
 * Formats data about test results by describe.
 *
 * @param {Object} testResults - Tests reports.
 * @returns {Object} Formatted test result data.
 */
const getTestResults = ({ testResults }) => {
    return testResults.reduce((accumulator, testSuites) => {
        const { testResults: result, testFilePath, perfStats } = testSuites;
        const relativePath = getRelativePath(testFilePath);
        const formatedTestResults = recordTestResults({
            testResults: result,
            relativePath,
            perfStats,
        });
        return { ...accumulator, ...formatedTestResults };
    }, {});
};

module.exports = {
    getTestResults,
    formingScripts
};
