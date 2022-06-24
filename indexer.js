const FileHandler = require("./src/utility/file-handler");
const TextProcessor = require("./src/utility/text-processor");
const input = require("./src/utility/input");

async function main() {
    console.log('initialising');

    // get initial data
    let arr_text = FileHandler.getFileTextLines();
    let end_index = TextProcessor.findLastLineOfWindowTranslations(arr_text);

    // find languages
    let languages = TextProcessor.findAllLanguages(arr_text, end_index);
    let headers = TextProcessor.findAllTypes(arr_text, languages[0]);

    let headerIndex = await input('Indexer\n---------------\n\nLanguages: ' + languages.map(language => language.language) + '\nTypes:' + headers.map((header, index) => { return ' ' + index + '.' + header.header }) + '\n\nPlease enter an index or type U to update:\n');
    if (headerIndex.toLowerCase() === 'u') {
        console.log('This feature isn\'t supported yet\nbye')
    } else {
        let index = parseInt(headerIndex);
        let user_input = await input('\nEnter english translation: ');

        let user_input_key = TextProcessor.toKey(user_input);
        let user_has_confirmed_key = false;
        while (!user_has_confirmed_key) {

            // TODO: check if key is valid

            let user_confirmation = await input('The following key will be used: ' + user_input_key + '\n\ntype \'y\' to confirm: ');
            if (user_confirmation.toLowerCase() === 'y') {
                user_has_confirmed_key = true;
            } else {
                user_input_key = (await input('Enter an alternative key: \n')).trim().replace(/ /g, ''); // remove all whitespace
            }
        }

        let lines = TextProcessor.getLinesToInsert(headers[index].header, arr_text);
        let text_to_insert = '      ' + user_input_key + ': \'' + user_input + '\',';
        let text_to_insert_other_language = text_to_insert + ' // TODO: update translations'


        lines.forEach((line, index) => {
            let new_line = line + index; // lines should increase everytime a new line is added
            if (index === 0) { // english
                arr_text.splice(new_line, 0, text_to_insert);
            } else {
                arr_text.splice(new_line, 0, text_to_insert_other_language);
            }
        });

        FileHandler.writeFile(arr_text);

        console.log(languages);
        console.log(headers);
        console.log(lines);
        console.log('done', index, TextProcessor.toKey(user_input));
    }

}

main();