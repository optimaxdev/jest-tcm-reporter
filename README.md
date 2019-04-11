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
    url: {
        host: 'https://jira.example.com/rest/kanoahtests/1.0'
    }
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
        "url": {
            "host": "https://jira.example.com/rest/kanoahtests/1.0"
        }
    }
}
```

#### Options

| Variable   | Default Value | Description                                                   |
| :--------- | :------------ | :------------------------------------------------------------ |
| cycleName  |               | Name cycle in JTM                                             |
| target     |               | Each `cases` separately or group by `describes`               |
| testRunKey |               | Сycle key, if specified, results are added to the existing it |

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

Append results are added to the existing cycle.
```bash
$ npx jest-tcm-reporter --cycleName=ANT_QA-34_Mobile --target=describe --testRunKey=ANT_C454
```