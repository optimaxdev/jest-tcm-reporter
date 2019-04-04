#!/usr/bin/env node

const opts = require('optimist').argv;
const { createTestCycles, createTestCyclesByDescribe } = require('../lib');

(function run() {
    switch (opts.target) {
        case 'case':
            createTestCycles().catch(err => {
                console.error(err); // eslint-disable-line no-console
            });
            break;
        case 'describe':
            createTestCyclesByDescribe().catch(err => {
                console.error(err); // eslint-disable-line no-console
            });
            break;
        default:
            throw Error(`Expected opts`);
    }
})();
