const fs = require('fs');

const { PATH_TO_INDEXJS, legacy_obj } = require('../../env');


/**
 * handles migration of legacy object 
 */
class LegacyMigrator {
    /**
     * generates a translations.json file based on legacy object defined in env.js
     * @returns {String} output message
     */
    static generateJSONFile() {
        if (legacy_obj) {
            let jsonOutput = JSON.stringify(legacy_obj, null, "\t");
            LegacyMigrator.writeFile(jsonOutput);
            return 'translations.json updated';
        }

        return 'Legacy Object undefined. Remember to copy the legacy index.js object into env first';
    }

    /**
     * writes file
     */
    static writeFile(json) {
        let file_path = PATH_TO_INDEXJS.replace('/index.js', '/translations.json');
        fs.writeFile(file_path, json, () => { });
    }
}

module.exports = LegacyMigrator;