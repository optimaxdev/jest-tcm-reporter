const {
    reportException,
    getTestKey,
    formatStatus,
    getRelativePath,
    confResult,
    getStatus,
    formingSteps,
} = require('./common');

/**
 * Get script result.
 *
 * @param {Array} testResult - Result of the test case.
 * @returns {Object} Script result for JTM.
 */
const getScriptResults = testResult =>
    testResult.map((testCase, index) => ({
        index,
        comment: `Path - ${testCase.path}`,
        status: confResult(testCase.status),
    }));

/**
 * Format result for Test Cycles.
 *
 * @param {Object} testResults - Test result data.
 * @returns {Array} List with the result.
 */
const formingScripts = testResults => {
    const resultsList = [];
    Object.entries(testResults).forEach(test => {
        const [key, value] = test;
        const status = getStatus(value);
        const scriptResults = getScriptResults(value);

        resultsList.push({
            status,
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
    formingScripts,
    formingSteps,
};
