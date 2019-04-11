const fs = require('fs-extra');
const opts = require('optimist').argv;
const { testRun } = require('../model/test-run');
const { testCase } = require('../model/test-case');
const factory = require('../test-handler/factory');
const { config } = require('../config/config');

const reports = fs.readJsonSync(config.reportsFile.JSON);

/**
 * Run lib
 */
async function run() {
    const { testRunKey, target } = opts;
    const testHandler = factory.create(target);

    if (testHandler === null) throw Error('Could not determine testHandler');
    const testResults = testHandler.getTestResults(reports);
    const result = testHandler.formingScripts(testResults);
    const resultTestCase = testHandler.formingSteps(testResults);

    if (testRunKey) {
        await testCase.prepare(resultTestCase);
        await testRun.append(result, testRunKey);
    } else {
        await testCase.prepare(resultTestCase);
        await testRun.create(result);
    }
}

module.exports = {
    run,
};
