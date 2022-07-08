const FileHandler = require("./src/utility/file-handler");
const TextProcessor = require("./src/utility/text-processor");
const input = require("./src/utility/input");

async function main() {
    console.log('\n\nIndexer\n---------------\n');

    // get initial data
    let arr_text = FileHandler.getFileTextLines();
    let end_index = TextProcessor.findLastLineOfWindowTranslations(arr_text);

    // find languages
    let languages = TextProcessor.findAllLanguages(arr_text, end_index);
    let headers = TextProcessor.findAllTypes(arr_text, languages[0]);

    // assign first arg
    let arg_one = '';
    if (process.argv.length > 2) { // has args
        arg_one = process.argv[2];
    }

    let user_input;

    switch (arg_one) {
        case 'add':
            console.log('<Add a new Translation>');
            let headerIndex = await input('Languages: ' + languages.map(language => language.language) + '\nTypes:\n ' + headers.map((header, index) => { return ' [' + index + ']' + header.header + '\n' }) + '\nPlease enter an index:\n');

            user_input = await input('\nEnter english translation: ');
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

            let lines = TextProcessor.getLinesToInsert(headers[parseInt(headerIndex)].header, arr_text); // get specific indexes to insert in
            let text_to_insert = '      ' + user_input_key + ': \'' + user_input + '\',';
            let text_to_insert_other_language = text_to_insert + ' // TODO: update translations'

            // insert lines
            lines.forEach((line, index) => {
                let new_line = line + index; // lines should increase everytime a new line is added
                if (index === 0) { // english
                    arr_text.splice(new_line, 0, text_to_insert);
                } else {
                    arr_text.splice(new_line, 0, text_to_insert_other_language);
                }
            });

            FileHandler.writeFile(arr_text); // save changes

            console.log('\n\nInserted ' + lines.length + ' lines.\nNOTE: ' + (lines.length - 1) + ' of translations need to be updated.');
            break;
        case 'find':
            console.log('<Find a translation>');
            user_input = await input('\nEnter text to search for: ');
            let results = TextProcessor.findMatch(arr_text, user_input);

            // if matches found
            if (results.length > 0) {
                console.log("Matches Found:\n", results);
                let all_headers = [...headers, TextProcessor.findAllTypes(arr_text, languages[1])]; // add in headers of chinese also
                user_input = await input('\nEnter index of match: ');
                // finds header of selected line
                let selected_result = results[parseInt(user_input)];
                let selected_line = selected_result.line;
                let selected_header;
                for (let i = 0; i < all_headers.length; i++) {
                    let header = all_headers[i];
                    if (header.starting_line_index < selected_line && selected_line < header.closing_line_index) {
                        // found header
                        selected_header = header.header;
                        break;
                    }
                }

                console.log("You can access this line by:\nLocaliseHelper.localise." + selected_header + "." + selected_result.header)
            }
            else {
                console.log("No matches found");
            }
            break;
        default:
            console.log('You didn\'t pass in any arguments. Try running \'npm start\' with some of these:\nadd - add a new translation\nfind - find existing translations');
            break;
    }

}

main();