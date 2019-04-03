const JoyCon = require('joycon');
const path = require('path');

const CONFIG_FILES = ['jest-tcm.config.js', 'package.json'];

const joycon = new JoyCon();

export function getPersonalConfig() {
    const result = joycon.loadSync(CONFIG_FILES);
    const extname = path.extname(result.path);
    switch (extname) {
        case '.js':
            return result.data;
        case '.json':
            return result.data['jest-tcm'];
        default:
            return {};
    }
}
