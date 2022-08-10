const FileHandler = require("../utility/file-handler");
const input = require("../utility/input");
const TextProcessor = require("../utility/text-processor");


/**
 * adds a new translation
 * 
 * @param {Array} argv - arguments
 */
async function add(argv) {
    // has sufficient args
    if (argv.length > 3) {
        let new_translation = argv[3];

        // invalid translation
        if (new_translation.trim() === "") {
            console.log("Enter a valid translation");
            return;
        }

        // TODO: check for possible matches and show user  

        // select label
        let labels = TextProcessor.labels;
        let lastIndex = labels.length - 1;
        for (let i = 0; i < labels.length; i++) {
            console.log('[' + i + '] ' + labels[i]);
        }
        let labelIndex = NaN;
        let label;
        while (Number.isNaN(labelIndex) || labelIndex < 0 || labelIndex > lastIndex) {
            labelIndex = parseInt(await input('Please select a label by entering an index from [0] to [' + (lastIndex) + ']: '))
            label = labels[labelIndex];
        }

        // select key
        let user_input_key = TextProcessor.toKey(new_translation);
        let user_has_confirmed_key = false;
        while (!user_has_confirmed_key) {
            // TODO: check if key is valid (regex and if already exists)
            // check whether key is valid
            let isInvalid = false;
            let isAlreadyThere = TextProcessor.doesTranslationTitleExist(label, user_input_key);
            if (isAlreadyThere) {
                isInvalid = true;
            }
            let user_confirmation = '';

            if (isInvalid) {
                // if invalid, prompt for valid key
                user_input_key = await input('Enter translation title (previous input might be invalid): ');
            } else {
                // if valid, get confirmation
                user_confirmation = await input('The following translation title will be used: ' + user_input_key + '\n\ntype \'y\' to confirm or enter alternative title: ');
                if (user_confirmation.toLowerCase() === 'y') {
                    user_has_confirmed_key = true;
                } else {
                    user_input_key = user_confirmation.trim().replace(/ /g, ''); // remove all whitespace
                }
            }
        }

        let language = 'en';
        if (argv.length > 4) {
            language = argv[4];

            // if user entered language is not valid, reset to default
            if (!TextProcessor.languages.includes(language)) {
                console.log('You entered an invalid language: ' + language + '\nYour translation will be added under en instead.\nFor reference, here are your options:\n' + TextProcessor.languages);
                language = 'en';
            }
        }

        let previous_obj = FileHandler.translationObject;

        // update main translation
        previous_obj[language][label][user_input_key] = new_translation;

        // update other languages
        let languages = TextProcessor.languages.filter((languageEntry) => languageEntry != language); // languages not including the one thats already added
        languages.forEach(
            (language) => {
                previous_obj[language][label][user_input_key] = new_translation;
                previous_obj[language][label][user_input_key + '_TODO'] = '';
            }
        )

        console.log(FileHandler.updateFileWithNewObject(previous_obj));
        console.log('There are ' + TextProcessor.listTODOPaths().length + ' pending translations');
        return;
    }

    console.log('You need to pass in the new translation string or object too!');
}

module.exports = add;