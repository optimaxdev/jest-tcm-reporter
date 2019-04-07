const fetch = require('node-fetch');
const opts = require('optimist').argv;

const { config } = require('../config/config');

/**
 * Get own headers.
 *
 * @param {Object} auth - Information about users tcm.
 * @returns {fetch.Headers} New headers.
 */
const getHeaders = auth => {
    const headers = new fetch.Headers();

    headers.set('Content-Type', 'application/json');
    headers.set(
        'Authorization',
        `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`,
    );

    return headers;
};

const requests = {
    /**
     * Post request.
     *
     * @param {string} url - Resources.
     * @param {Object} body - Body request.
     */
    post: (url, body) =>
        fetch(`${config.api.host}${url}`, {
            method: 'post',
            headers: getHeaders(config.tcm.user),
            body: JSON.stringify(body),
        }),
    /**
     * Put request.
     *
     * @param {string} url - Resources.
     * @param {Object} body - Body request.
     */
    put: (url, body) =>
        fetch(`${config.api.host}${url}`, {
            method: 'put',
            headers: getHeaders(config.tcm.user),
            body: JSON.stringify(body),
        }),
};

const testRun = {
    /**
     * Create test cycles.
     *
     * @param {Array} items - Test result list.
     * @param {string} name - Tect cycles name for JTM.
     */
    create: (items, name = opts.cycleName) =>
        requests
            .post('/testrun', { projectKey: config.tcm.projectKey, name, items })
            .then(res => res.json())
            .then(res => {
                if (!res.key) throw Error(JSON.stringify(res, null, 2));
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console,

    /**
     * Append test results.
     *
     * @param {Array} items - Test result list.
     * @param {string} testRunKey - testrun key
     */
    append: (items, testRunKey) =>
        requests
            .post(`/testrun/${testRunKey}/testresults`, items)
            .then(res => res.json())
            .then(res => {
                if (!Array.isArray(res)) throw Error(JSON.stringify(res, null, 2));
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console,,
};

const testCase = {
    /**
     * Update test case.
     *
     * @param {string} testCaseKey - Key for test case.
     * @param {Array} steps - Step list.
     * @param {string} type - Type for test case.
     */
    update: (testCaseKey, steps, type = 'STEP_BY_STEP') =>
        requests
            .put(`/testcase/${testCaseKey}`, { testScript: { type, steps } })
            .then(res => (res.ok ? {} : res.json()))
            .then(res => {
                if (res.status && res.status.statusCode === 401) throw Error(res.status.message);
                if (res.errorMessages) throw Error(res.errorMessages.join(' '));
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console
};

module.exports.api = {
    testRun,
    testCase,
};
