const TextProcessor = require("../utility/text-processor");

/**
 * prompts user to update translations
 */
async function update(argv) {
    console.log('There are ' + TextProcessor.listTODOPaths().length + ' pending translations');
    console.log('This section hasn\'t been implemented yet');
}

module.exports = update;