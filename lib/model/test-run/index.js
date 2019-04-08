const { api } = require('../../api');

const testRun = {
    create(reports) {
        debugger
        return api.testRun.create(reports);
    },
    append(reports, testRunKey) {
        return api.testRun.append(reports, testRunKey);
    },
};

module.exports = {
    testRun,
};
