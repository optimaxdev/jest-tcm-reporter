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
const getTestName = test => {
    return test.testResults[0].ancestorTitles[0];
};

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
const recordTestResultsByDescribe = dataResult => {
    const { testResults, relativePath, perfStats } = dataResult;
    const name = getTestName(dataResult);

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
const getTestResultsByDescribe = ({ testResults }) => {
    return testResults.reduce((accumulator, testSuites) => {
        const { testResults, testFilePath, perfStats } = testSuites;
        const relativePath = getRelativePath(testFilePath);
        const formatedTestResults = recordTestResultsByDescribe({
            testResults,
            relativePath,
            perfStats,
        });
        return { ...accumulator, ...formatedTestResults };
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
        const { testResults, testFilePath } = testSuites;
        const relativePath = getRelativePath(testFilePath);
        recordTestResults(testResults, relativePath, accumulator);

        return { ...accumulator };
    }, {});

module.exports = {
    getTestResults,
    getTestResultsByDescribe
}