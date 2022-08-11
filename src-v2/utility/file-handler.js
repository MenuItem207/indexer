const fs = require('fs');
const { READ_PATH_TO_INDEXJS, WRITE_PATH_TO_INDEXJS } = require('../../env');

let read_src_path = READ_PATH_TO_INDEXJS.replace('/index.js', '/translations.json');
let write_src_path = WRITE_PATH_TO_INDEXJS.replace('/index.js', '/translations.json');
let json = {};
try {
    json = require(read_src_path);
} catch (err) {
    console.log('Translation file not created yet!');
}

/**
 * handles the interfacing of the translations json file 
 */
class FileHandler {
    /**
     * @returns {String} path to translations.json
     */
    static get translationsJSONPath() {
        return src_path;
    }

    /**
     * @returns {Object} translations
     */
    static get translationObject() {
        return json;
    }

    /**
     * updates translations.json file with new json object
     * 
     * @param {Object} newObj 
     * @returns {String} message
     */
    static updateFileWithNewObject(newObj) {
        try {
            let jsonString = JSON.stringify(newObj, null, "\t");
            fs.writeFile(write_src_path, jsonString, () => { });
            return 'Updated file';
        } catch (err) {
            return 'Error updating file:\n' + err;
        }
    }
}

module.exports = FileHandler;