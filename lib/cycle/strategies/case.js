const { getTestResults } = require('../../test-handler/case');
const { formingScripts } = require('../helpers');

function caseStrategy(reports) {
    const testResults = getTestResults(reports);
    const resultsList = formingScripts(testResults);
    return resultsList;
}

module.exports = {
    caseStrategy,
};
