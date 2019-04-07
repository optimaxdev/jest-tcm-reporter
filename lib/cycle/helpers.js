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
        default:
            return 'Not Executed';
    }
};

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
    formingScripts,
};
