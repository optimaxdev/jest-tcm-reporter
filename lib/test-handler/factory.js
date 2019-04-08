const testCase = require('./case');
const testDescribe = require('./describe');

/**
 * The factory gives by name test handler
 *
 * @param {string} name - name test handler
 * @returns {Object | null} - object test handler have common interface
 */
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
