const fs = require('fs-extra');
const opts = require('optimist').argv;
const { testRun } = require('../model/test-run');
const { testCase } = require('../model/test-case');
const TestHandler = require('../test-handler/factory');
const { config } = require('../config/config');

const reports = fs.readJsonSync(config.reportsFile.JSON);

async function run() {
    const { testRunKey, target } = opts
    const testHandler = TestHandler.create(target);

    if (testHandler === null) throw Error('Could not determine testHandler');

    const result = formingScripts(testHandler.getTestResults(reports));
    if (testRunKey) {
        testCase.prepare(result);
        testRun.append(result, testRunKey);
    } else {
        testCase.prepare(result);
        testRun.create(result);
    }
}

module.exports = {
    run,
};
