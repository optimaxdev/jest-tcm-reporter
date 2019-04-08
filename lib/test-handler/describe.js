const AbstractTestHandler = require('./abstract');

class Describe extends AbstractTestHandler {
    /**
     * Formats data test suites.
     *
     * @namespace
     * @param {Object} dataResult - Test test tes.
     * @property {Object} dataResult.testResults - Test suite.
     * @property {string} dataResult.relativePath - Test path.
     * @property {Object} dataResult.perfStats - Test date.
     * @returns {Object} Result of the test suite.
     */
    recordTestResults (dataResult) {
        const { testResults, relativePath, perfStats } = dataResult;
        const name = this.getTestKey(this.getTestName(dataResult));

        return testResults.reduce((accumulator, test) => {
            const { title, status, duration } = test;
            const { end } = perfStats;
            const key = this.getTestKey(title);
            const newTestData = {
                title,
                status: this.formatStatus(status),
                path: relativePath,
                duration,
                finishDate: new Date(end),
                key,
            };

            if (!key) {
                this.reportException(title);
                return accumulator;
            }

            return {
                ...accumulator,
                ...(Object.prototype.hasOwnProperty.call(accumulator, name)
                    ? { [name]: [...accumulator[name], newTestData] }
                    : { [name]: [newTestData] }),
            };
        }, {});
    }

    /**
     * Formats data about test results by describe.
     *
     * @param {Object} testResults - Tests reports.
     * @returns {Object} Formatted test result data.
     */
    getTestResults ({ testResults }) {
        return testResults.reduce((accumulator, testSuites) => {
            const { testResults: result, testFilePath, perfStats } = testSuites;
            const relativePath = this.getRelativePath(testFilePath);
            const formatedTestResults = this.recordTestResults({
                testResults: result,
                relativePath,
                perfStats,
            });
            return { ...accumulator, ...formatedTestResults };
        }, {});
    }
}

module.exports = Describe