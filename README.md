[![Build Status](https://travis-ci.org/optimaxdev/jest-tcm-reporter.svg?branch=master)](https://travis-ci.org/optimaxdev/jest-tcm-reporter)
# jest-tcm-reporter

This package sends reports to the [Kanoah Tests](https://www.adaptavist.com/doco/display/KT/Documentation?utm_source=tm4jS&utm_medium=inapp) (Adaptavist) - Test Management for Jira

It works only with reports from `jest` 

## Installation

```bash
$ yarn add --dev optimaxdev/jest-tcm-reporter#master
```

## Configuration

Create config file `jest-tcm.config.js`

```js
// jest-tcm.config.js

module.exports = {
    tcm: {
        user: {
            username: 'user',
            password: 'password',
        },
        projectKey: 'KEY'
    },
    reportsFile: {
        JSON: './public/reports/team-city.json'
    },
    api: {
        host: 'https://jira.example.com/rest/kanoahtests/1.0'
    },
    whitelist: {
        enabled: true,
        checkVersion: true,
        query: 'projectKey = "KEY" AND status = "Approved"',
    },
}
```

or add a config to `package.json`

```json
// package.json

{
    "jest-tcm": {
        "tcm": {
            "user": {
                "username": "user",
                "password": "password",
            },
            "projectKey": "KEY"
        },
        "reportsFile": {
            "JSON": "./public/reports/team-city.json"
        },
        "api": {
            "host": "https://jira.example.com/rest/kanoahtests/1.0"
        },
        "whitelist": {
            "enabled": true,
            "checkVersion": true,
            "query": "projectKey = \"KEY\" AND status = \"Approved\""
        }
    }
}
```

#### Options

| Variable    | Default Value | Description                                                   |
| :---------- | :------------ | :------------------------------------------------------------ |
| cycleName   |               | Name cycle in JTM                                             |
| target      |               | Each `cases` separately or group by `describes`               |
| testRunKey  |               | Сycle key, if specified, results are added to the existing it |
| updateCases |               | If specified, test cases' steps will be updated.              |

## Whitelist feature

Whitelist feature now only works for `describe` strategy.

Pattern for naming is: [KEY (VERSION)]

### Whitelist configuration

- `enabled` - If true, only test cases in whitelist will be marked.
- `query` - Query to form whitelist ([See /testrun/search in api doc](https://docs.adaptavist.io/tm4j/server/api/v1/)).
- `checkVersion` - If true, only cases with the same version will be marked (compare with latest version of case).

## Usage

Each case separately
```bash
$ npx jest-tcm-reporter --cycleName=ANT_QA-34_Mobile --target=case
```
####
Grouped by describe
```bash
$ npx jest-tcm-reporter --cycleName=ANT_QA-34_Mobile --target=describe
```
###
With updating cases
```bash
$ npx jest-tcm-reporter --cycleName=ANT_QA-34_Mobile --target=case --updateCases
```
###
Append results are added to the existing cycle.
```bash
$ npx jest-tcm-reporter --cycleName=ANT_QA-34_Mobile --target=describe --testRunKey=ANT_C454
```