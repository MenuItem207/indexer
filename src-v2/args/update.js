const FileHandler = require("../utility/file-handler");
const input = require("../utility/input");
const TextProcessor = require("../utility/text-processor");

/**
 * prompts user to update translations
 */
async function update(argv) {
    let todoPaths = TextProcessor.listTODOPaths();
    console.log('There are ' + todoPaths.length + ' pending translations');

    // don't do anything if there are no pending translations
    if (todoPaths.length === 0) {
        return;
    }

    let index = 0;
    todoPaths.forEach(
        (path) => {
            console.log('[' + index + '] Language: ' + path[0] + ' | Path: ' + path[1] + '.' + path[2] + ' | Translation: ' + path[3]);
            index++;
        }
    );

    // get valid index
    let selectedIndex = NaN;
    while (Number.isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex > (todoPaths.length - 1)) {
        selectedIndex = parseInt(await input('Enter index of entry you\'d like to translate: '));
    }

    let selectedPath = todoPaths[selectedIndex];
    let lang = selectedPath[0];
    let label = selectedPath[1];
    let title = selectedPath[2];
    let translation = selectedPath[3];
    console.log('The original translation is: ' + translation);
    let newTranslation = await input('Translate text to ' + lang + ': ');
    // TODO: verify translated text

    // update text
    let newObj = FileHandler.translationObject;
    newObj[lang][label][title] = newTranslation;
    delete newObj[lang][label][title + '_TODO']; // delete the todo indicator
    FileHandler.updateFileWithNewObject(newObj);

    console.log('Updated translation');
    console.log('There are ' + TextProcessor.listTODOPaths().length + ' pending translations');
}

module.exports = update;