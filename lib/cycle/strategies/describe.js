const { getTestResults } = require('../../test-handler/describe');
const { formingScripts } = require('../helpers');

function describeStrategy(reports) {
    const testResults = getTestResults(reports);
    const resultsList = formingScripts(testResults);
    return resultsList;
}

module.exports = {
    describeStrategy,
};
