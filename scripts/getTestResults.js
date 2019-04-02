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
 * Formats data about test results.
 *
 * @param {Object} testResults - Tests reports.
 * @returns {Object} Formatted test result data.
 */
export const getTestResults = ({ testResults }) =>
    testResults.reduce((accumulator, testSuites) => {
        const { testResults, testFilePath } = testSuites;
        const relativePath = getRelativePath(testFilePath);
        recordTestResults(testResults, relativePath, accumulator);

        return { ...accumulator };
    }, {});
