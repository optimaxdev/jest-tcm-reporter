const { createTestCycles, createTestCyclesByDescribe } = require('../scripts/');

(function run() {
    if (process.argv.includes('by-case')) {
        createTestCycles().catch(err => {
            console.error(err); // eslint-disable-line no-console
        });
    } else if (process.argv.includes('by-describe')) {
        createTestCyclesByDescribe().catch(err => {
            console.error(err); // eslint-disable-line no-console
        });
    } else {
        throw Error('Expected parameter');
    }
})();
