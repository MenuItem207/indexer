/**
 * model for a language object
 */
class Language {
    constructor(language, starting_line_index, closing_line_index) {
        this.language = language;
        this.starting_line_index = starting_line_index;
        this.closing_line_index = closing_line_index;
    }
}

module.exports = Language;