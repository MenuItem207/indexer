const LegacyMigrator = require('../utility/legacy-migrator');

/**
 * migrates legacy index.js object into a translations.json file
 */
async function migrateLegacy() {
    console.log(LegacyMigrator.generateJSONFile());
}

module.exports = migrateLegacy;