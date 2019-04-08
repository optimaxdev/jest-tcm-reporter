const testCase = require('./case');
const testDescribe = require('./describe');

function create(name) {
    if (name === 'case') {
        return testCase;
    }
    if (name === 'describe') {
        return testDescribe;
    }

    return null;
}

module.exports = {
    create,
};
