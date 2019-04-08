const { api } = require('../../api');

const testCase = {
    prepare(reports) {
        reports.forEach(testCase => {
            const { testCaseKey, scriptResults } = testCase;
            const steps = scriptResults.map(step => ({ description: step.comment }));

            api.testCase.update(testCaseKey, steps);
        });
    },
};

module.exports = {
    testCase,
};
