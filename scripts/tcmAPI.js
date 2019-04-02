const fetch = require('node-fetch');

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
        fetch(`https://jira.gusadev.com/rest/kanoahtests/1.0${url}`, {
            method: 'post',
            headers: getHeaders(config.tcm.user),
            body: JSON.stringify(body),
        }).catch(err => console.error(err)), // eslint-disable-line no-console
};

const testRun = {
    /**
     * Create test cycles.
     *
     * @param {Array} items - Test result list.
     * @param {string} name - Tect cycles name for JTM.
     */
    create: (items, name = process.env.TCM_CYCLE_KEY) =>
        requests.post('/testrun', { projectKey: config.tcm.projectKey, name, items }),
};

export const agent = {
    testRun,
};
