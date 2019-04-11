const { api } = require('../../api');

const testCase = {
    /**
     * Prepare steps for test case.
     * @param {Array} reports - list test cases.
     * @param {string} type - Step list.
     * @returns {Promise<Array<>>} - Array of responses.
     */
    async prepare(reports, type = 'STEP_BY_STEP') {
        return Promise.all(
            reports.map(async test => {
                const { testCaseKey, scriptResults } = test;
                const steps = scriptResults.map(step => ({ description: step.description }));
                return api.testCase.update(testCaseKey, {
                    testScript: {
                        type,
                        steps,
                    },
                });
            }),
        );
    },
};

module.exports = {
    testCase,
};
