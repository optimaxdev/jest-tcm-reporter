const { api } = require('../../api');

const testCase = {
    /**
     * Prepare steps for test case.
     * @param {Array} reports - list test cases.
     * @param {string} type - Step list.
     */
    async prepare(reports, type = 'STEP_BY_STEP') {
        await Promise.all(
            reports.map(async test => {
                const { testCaseKey, scriptResults } = test;
                const steps = scriptResults.map(step => ({ description: step.description }));
                await api.testCase.update(testCaseKey, {
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
