# jest-tcm-reporter

This package sends reports to the JTM

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
        projectKey: 'ANT'
    },
    reportsFile: {
        JSON: './public/reports/team-city.json',
        HTML: './public/reports/team-city.html',
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
            "projectKey": "ANT"
        },
        "reportsFile": {
            "JSON": "./public/reports/team-city.json",
            "HTML": "./public/reports/team-city.html"
        },
        "url": {
            "host": "https://jira.example.com/rest/kanoahtests/1.0"
        }
    }
}
```

#### Options

| Variable  | Default Value | Description                                     |
| :-------- | :------------ | :---------------------------------------------- |
| cycleName |               | Name cycle in JTM                      |
| target    |               | Each `cases` separately or group by `describes` |

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