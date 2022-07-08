const Language = require("../models/language");
const Header = require("../models/header");

/**
 * handles the proccessing of text
 */
class TextProcessor {
    /**
     * returns index of last line of window.translations. Assumes that there is only one '};' in file
     * 
     * @param {Array} array_text 
     */
    static findLastLineOfWindowTranslations(array_text) {
        for (let i = 0; i < array_text.length; i++) {
            if (array_text[i] === '};') {
                return i;
            }
        }

        return -1;
    }

    /**
     * converts a '  label: {' => 'label'
     */
    static getLabelFromLine(line) {
        return line.split(':')[0].trim();
    }

    /**
     * returns array of Languages
     * 
     * @param {Array} array_text - array of lines of text
     * @param {int} last_line - last line of translations object (last curly)
     */
    static findAllLanguages(array_text, last_line) {
        let languages = [];
        array_text.forEach(
            (line, index) => {
                if (Regex.language_regexp.test(line)) { // if language found
                    let newLanguage = new Language(TextProcessor.getLabelFromLine(line), index, -1);

                    // update previous language
                    if (languages.length > 0) {
                        languages[languages.length - 1].closing_line_index = index - 1; // set closing line index of previous language to a line before this
                    }

                    languages.push(newLanguage);
                }
            }
        );

        languages[languages.length - 1].closing_line_index = last_line - 1; // last language won't have a line so set to last_line - 1
        return languages;
    }

    /**
     * finds all headers within a language
     * 
     * @param {Array} array_text 
     * @param {Language} language 
     */
    static findAllTypes(array_text, language) {
        let starting_line = language.starting_line_index;
        let closing_line = language.closing_line_index;

        let headers = [];

        for (let i = starting_line + 1; i < closing_line; i++) {
            let line = array_text[i];
            if (Regex.header_regexp.test(line)) {
                let newHeader = new Header(TextProcessor.getLabelFromLine(line), i, -1);

                // update previous header
                if (headers.length > 0) {
                    headers[headers.length - 1].closing_line_index = i - 1; // set closing line index of previous header to a line before this
                }

                headers.push(newHeader);
            }
        }

        headers[headers.length - 1].closing_line_index = closing_line - 1;
        return headers;
    }

    /**
     * returns array of lines to insert at
     * 
     * @param {String} header_type 
     * @param {Array} array_text 
     */
    static getLinesToInsert(header_type, array_text) {
        let lines = [];
        let regex = Regex.custom_header_regexp(header_type);

        array_text.forEach(
            (line, index) => {
                if (regex.test(line)) {
                    lines.push(index + 1); // insert at next line
                }
            }
        );

        return lines;
    }

    /**
     * converts text into => converts_text_into
     * 
     * @param {String} text 
     */
    static toKey(text) {
        return text.toLowerCase().replaceAll(' ', '_');
    }

    /**
     * a line might be something like
     * abc: "pure string",
     * this function returns 'pure string'
     * 
     * @param {String} text
     */
    static getPureString(text) {
        let string = text.split(": ")[1];
        return string.slice(1, -2); // remove first character: " and last 2 characters: ",
    }

    /**
     * a line might be something like
     * abc: "pure string",
     * this function returns 'abc'
     * 
     * @param {String} text
     */
    static getPureStringHeader(text) {
        let string = text.split(": ")[0];
        return string.trim();
    }

    /**
     * iterates through array text to find matching keywords
     * 
     * @param {Array} array_text 
     * @param {String} search_text 
     */
    static findMatch(array_text, search_text) {
        // find lines that includes search text
        let matches = [];
        array_text.forEach(
            (text, index) => {
                if (text.includes(search_text)) {
                    // calculate match %
                    let percentage = search_text.length / text.length;

                    matches.push({
                        index: matches.length,
                        data: TextProcessor.getPureString(text),
                        header: TextProcessor.getPureStringHeader(text),
                        percentage: percentage,
                        line: index
                    });
                }
            }
        );

        // sort matches in descending order
        return matches.sort(
            (a, b) => {
                if (a.percentage > b.percentage) {
                    return -1;
                }

                if (a.percentage < b.percentage) {
                    return 1;
                }

                return 0;
            }
        );
    }
}

/**
 * stores regex
 */
class Regex {
    /**
     * RegExp for checking if a line contains 
     */
    static language_regexp = new RegExp('^  [a-zA-Z]+: \{');

    /**
     * RexExp for echking if a line contains
     */
    static header_regexp = new RegExp('^    [a-zA-Z]+: \{');

    /**
     * returns specific header regexp 
     * 
     * @param {String} type 
     */
    static custom_header_regexp(type) {
        return new RegExp('^    ' + type + ': \{');
    }
}

module.exports = TextProcessor;