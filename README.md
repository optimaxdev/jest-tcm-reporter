# jest-tcm-reporter

This package sends team-city test reports to the test manager

## Installation

```bash
$ yarn add --dev optimaxdev/jest-tcm-reporter#master
```

## Usage

To create tests by cases
```bash
$ npx jest-tcm-reporter by-case
```
####
To create tests by describes
```bash
$ npx jest-tcm-reporter by-describe
```

## Configuration

Create config file `jest-tcm.config.js`

```js
// jest-tcm.config.js

export default {
    tcm: {
        user: {
            username: 'user',
            password: 'password',
        },
        projectKey: 'ANT'
    },
    reportsFile: {
        JSON: './public/reports/team-city.json',
        HTML: './public/reports/team-city.html',
    }
}
```

or add a rule to `package.json`

```json
// package.json

{
    "jest-tcm": {
        "tcm": {
            "user": {
                "username": "user",
                "password": "password",
            },
            "projectKey": "ANT"
        },
        "reportsFile": {
            "JSON": "./public/reports/team-city.json",
            "HTML": "./public/reports/team-city.html"
        }
    }
}
```

#### Environment Variables

| Variable      | Default Value     | Description                |
| :------------ | :---------------- | :------------------------- |
| TCM_CYCLE_KEY |                   | Name cycle in test manager |
| TCM_USERNAME  | value from config | Username from jira         |
| TCM_PASSWORD  | value from config | Password from jira         |
