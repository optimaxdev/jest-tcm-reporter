const AbstractTestHandler = require('./abstract');

class Case extends AbstractTestHandler {
    /**
     * Formats data test suites.
     *
     * @param {Object} testSuitesResult - Test suite.
     * @param {string} path - Test path.
     * @param {Object} data - Accumulator for results.
     * @returns {Object} Result of the test suite.
     */
    recordTestResults (testSuitesResult, path, data = {}) {
        return testSuitesResult.reduce((accumulator, test) => {
            const { title, status } = test;
            const key = this.getTestKey(title);

            if (!key) {
                this.reportException(title);
                return false;
            }

            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key].push({
                    title,
                    status: this.formatStatus(status),
                    path,
                });
            } else {
                Object.assign(data, {
                    [key]: [
                        {
                            title,
                            status: this.formatStatus(status),
                            path,
                        },
                    ],
                });
            }

            return { ...accumulator, data };
        }, data);
    }

    /**
     * Formats data about test results.
     *
     * @param {Object} testResults - Tests reports.
     * @returns {Object} Formatted test result data.
     */
    getTestResults ({ testResults }) {
        return testResults.reduce((accumulator, testSuites) => {
            const { testResults: results, testFilePath } = testSuites;
            const relativePath = this.getRelativePath(testFilePath);
            this.recordTestResults(results, relativePath, accumulator);

            return { ...accumulator };
        }, {});
    }
}

module.exports = Case