const fs = require('fs-extra');
const opts = require('optimist').argv;
const { cycle } = require('../cycle');
const { getStrategy } = require('../cycle/strategies');
const { config } = require('../config/config');

const reports = fs.readJsonSync(config.reportsFile.JSON);

function run() {
    const strategy = getStrategy(opts.target);

    if (strategy === null) throw Error('Could not determine strategy');

    if (opts.testRunKey) {
        const { testRunKey } = opts;
        cycle.append(strategy, reports, testRunKey);
    } else {
        cycle.create(strategy, reports);
    }
}

module.exports = {
    run,
};
