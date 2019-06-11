/**
 * Transforms report status to status for TCM.
 *
 * @param {string} status - Report status.
 * @returns {string} Result status.
 */
const confResult = status => {
    switch (status) {
        case 'Fail':
            return 'Fail';
        case 'Pass':
            return 'Pass';
        case 'Pend':
            return 'In Progress';
        case 'Blocked':
            return 'Blocked';
        default:
            return 'Not Executed';
    }
};

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
const getTestKey = title => (RegExp(/\[(.*?)]/).exec(title) || '')[1];

/**
 * Get test case execution status.
 *
 * @param {Array} testResult - Result of the test case.
 * @returns {string} Test case execution status.
 */
const getStatus = testResult => {
    if (testResult.length === 1) return confResult(testResult[0].status);

    return testResult.reduce(
        (accumulator, testCase) => (testCase.status === 'Fail' ? 'Fail' : accumulator),
        'Pass',
    );
};

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
 * Get script result for test case.
 *
 * @param {Array} testResult - Result of the test case.
 * @returns {Object} Script result for JTM.
 */
const getTestData = testResult =>
    testResult.map((testCase, index) => ({
        index,
        description: testCase.title,
    }));

/**
 * Format result for Test Cases.
 *
 * @param {Object} testResults - Test result data.
 * @returns {Array} List with the result.
 */
const formingSteps = testResults => {
    const resultsList = [];
    Object.entries(testResults).forEach(test => {
        const [key, value] = test;
        const scriptResults = getTestData(value);

        resultsList.push({
            testCaseKey: key,
            scriptResults,
        });
    });
    return resultsList;
};

module.exports = {
    reportException,
    getTestKey,
    formatStatus,
    getRelativePath,
    confResult,
    getStatus,
    formingSteps,
};
