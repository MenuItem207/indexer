const LegacyMigrator = require('../utility/legacy-migrator');

/**
 * migrates legacy index.js object into a translations.json file
 */
async function migrateLegacy() {
    LegacyMigrator.generateJSONFile();
}

module.exports = migrateLegacy;