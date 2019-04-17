const {
    getTestKey,
    getTestName,
    formatStatus,
    getRelativePath,
    reportException,
    formingScripts,
    formingSteps,
} = require('./helpers/describe');

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
    const name = getTestName(dataResult);
    const key = getTestKey(name);

    if (!key) {
        reportException(name);
        return {};
    }

    return testResults.reduce((accumulator, test) => {
        const { title, status } = test;
        const { end } = perfStats;
        const newTestData = {
            title,
            status: formatStatus(status),
            path: relativePath,
            finishDate: new Date(end),
            comment: test.failureMessages.join('<br>'),
        };

        return {
            ...accumulator,
            ...(Object.prototype.hasOwnProperty.call(accumulator, key)
                ? { [key]: [...accumulator[key], newTestData] }
                : { [key]: [newTestData] }),
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
    formingScripts,
    formingSteps,
};
