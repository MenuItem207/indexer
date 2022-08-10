const fs = require('fs');
const { PATH_TO_INDEXJS } = require('../../env');

let src_path = PATH_TO_INDEXJS.replace('/index.js', '/translations.json');
const json = require(src_path);

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
            fs.writeFile(src_path, jsonString, () => { });
            return 'Updated file';
        } catch (err) {
            return 'Error updating file:\n' + err;
        }
    }
}

module.exports = FileHandler;