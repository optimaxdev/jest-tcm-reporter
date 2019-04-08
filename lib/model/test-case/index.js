const { api } = require('../../api');

const testCase = {
    /**
     * Prepare steps for test case.
     * @param {*} reports - .
     * @param {string} type - Step list.
     */
    prepare(reports, type = 'STEP_BY_STEP') {
        reports.forEach(test => {
            const { testCaseKey, scriptResults } = test;
            const steps = scriptResults.map(step => ({ description: step.description }));

            api.testCase.update(testCaseKey, {
                testScript: {
                    type,
                    steps,
                },
            });
        });
    },
};

module.exports = {
    testCase,
};
