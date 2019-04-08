const { api } = require('../../api');

const testRun = {
    /**
     * Create testrun
     *
     * @param {Array} reports - list test cases
     */
    create(reports) {
        return api.testRun.create(reports);
    },
    /**
     * Append test results in exist testrun
     *
     * @param {Array} reports - list test cases
     * @param {string} testRunKey - testrun key
     */
    append(reports, testRunKey) {
        return api.testRun.append(reports, testRunKey);
    },
};

module.exports = {
    testRun,
};
