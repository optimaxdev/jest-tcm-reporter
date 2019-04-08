const Case = require('./case');
const Describe = require('./describe');

class FactoryTestHandler {
    /**
     * The factory gives by name test handler
     *
     * @param {string} name - name test handler
     * @returns {Object | null} - object test handler have common interface
     */
    constructor (name) {
        switch (name) {
            case 'case':
                return new Case();
            case 'describe':
                return new Describe();
            default:
                return null
        }
    }
}

module.exports = FactoryTestHandler
