const { api } = require('../api');

const cycle = {
    create(strategy, reports) {
        const result = strategy(reports);
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
