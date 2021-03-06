const fetch = require('node-fetch');
const opts = require('optimist').argv;
const withQuery = require('with-query').default;

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
     * Get request.
     *
     * @param {string} url - Resources.
     * @param {Object} params - Query params.
     */
    get: (url, params = {}) =>
        fetch(withQuery(`${config.api.host}${url}`, params), {
            method: 'get',
            headers: getHeaders(config.tcm.user),
            params,
        }),
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
            .then(res => (res.ok ? {} : res.json()))
            .then(res => {
                if (res.status && res.status.statusCode === 401) throw Error(res.status.message);
                if (res.errorMessages) throw Error(res.errorMessages.join(' '));
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console

    /**
     * Append test results.
     *
     * @param {Array} items - Test result list.
     * @param {string} testRunKey - testrun key
     */
    append: (items, testRunKey) =>
        requests
            .post(`/testrun/${testRunKey}/testresults`, items)
            .then(res => (res.ok ? {} : res.json()))
            .then(res => {
                if (res.status && res.status.statusCode === 401) throw Error(res.status.message);
                if (res.errorMessages) throw Error(res.errorMessages.join(' '));
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console
};

const testCase = {
    /**
     * Update test case.
     *
     * @param {string} testCaseKey - Key for test case.
     * @param {Object} body - Body request.
     */
    update: (testCaseKey, body) =>
        requests
            .put(`/testcase/${testCaseKey}`, body)
            .then(res => (res.ok ? {} : res.json()))
            .then(res => {
                if (res.status && res.status.statusCode === 401) throw Error(res.status.message);
                if (res.errorMessages) throw Error(res.errorMessages.join(' '));
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console
    /**
     * Search test cases.
     *
     * @param {string} query - Search query
     * @returns {Object} body - Body request.
     */
    search: query =>
        requests
            .get('/testcase/search', { fields: 'id,key,majorVersion', query })
            .then(res => {
                const jsonRes = res.json();
                if (jsonRes.status && jsonRes.status.statusCode === 401)
                    throw Error(jsonRes.status.message);
                if (jsonRes.errorMessages) throw Error(jsonRes.errorMessages.join(' '));
                return jsonRes;
            })
            .catch(err => console.error(err)), // eslint-disable-line no-console
};

module.exports.api = {
    testRun,
    testCase,
};
