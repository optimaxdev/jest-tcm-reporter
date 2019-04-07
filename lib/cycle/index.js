const { api } = require('../api');

const cycle = {
    create(strategy, reports) {
        const result = strategy(reports);
        result.forEach(testCase => {
            const { testCaseKey, scriptResults } = testCase;
            const steps = scriptResults.map(step => ({ description: step.comment }));

            api.testCase.update(testCaseKey, steps);
        });
        api.testRun.create(result);
    },
    append(strategy, reports, testRunKey) {
        const result = strategy(reports);
        api.testRun.append(result, testRunKey);
    },
};

module.exports = {
    cycle,
};
