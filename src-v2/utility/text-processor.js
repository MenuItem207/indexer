const FileHandler = require("./file-handler");

/**
 * handles the proccessing of text
 */
class TextProcessor {
    /**
     * converts text into => converts_text_into
     * 
     * @param {String} text 
     */
    static toKey(text) {
        return text.toLowerCase().replaceAll(' ', '_');
    }

    /**
     * @returns {Array} languages for each language type inside the json object
     * {
     *  lang: {
     *      label: {
     *          translation_title: translation
     *             }
     *        }
     * }
     */
    static get languages() {
        return Object.keys(FileHandler.translationObject);
    }

    /**
     * @returns {Array} labels for each label inside the json object
     */
    static get labels() {
        let firstLang = TextProcessor.languages[0];
        return Object.keys(FileHandler.translationObject[firstLang]).filter((label) => !label.includes('_TODO'));
    }

    /**
     * @param {String} label
     * @returns {Array} translation_titles for each translation_title inside the json object
     */
    static getTranslationTitles(label) {
        let firstLang = TextProcessor.languages[0];
        return Object.keys(
            FileHandler.translationObject[firstLang][label]
        )
            .filter(
                (label) => !label.includes('_TODO') // don't include TODOs
            );
    }

    /**
     * @param {String} lang
     * @param {String} label
     * @returns {Array} translation_titles for each translation_title inside the json object that has a TODO
     */
    static getTODOTranslationTitles(lang, label) {
        return Object.keys(
            FileHandler.translationObject[lang][label]
        )
            .filter(
                (label) => label.includes('_TODO') // don't include TODOs
            );
    }

    /**
     * @param {String} label
     * @param {String} newTitle
     * @returns true if translation title already exists
     */
    static doesTranslationTitleExist(label, newTitle) {
        let titles = TextProcessor.getTranslationTitles(label);
        return titles.includes(newTitle);
    }

    /**
     * scans the json for TODOs and records the paths in an array [lang, label, title, translation]
     * @returns {Array<Array>}
     */
    static listTODOPaths() {
        let TODOS = [];

        let translationObject = FileHandler.translationObject;
        let languages = TextProcessor.languages;
        let labels = TextProcessor.labels;

        // iterate through languages
        for (let languageIndex = 0; languageIndex < languages.length; languageIndex++) {
            let language = languages[languageIndex];
            // iterate through labels
            for (let labelIndex = 0; labelIndex < labels.length; labelIndex++) {
                let label = labels[labelIndex];
                let todosForThisLabel = TextProcessor.getTODOTranslationTitles(language, label);
                todosForThisLabel.forEach(
                    (todo) => {
                        let actualTitle = todo.replace('_TODO', '');
                        TODOS.push([
                            language, label, actualTitle, translationObject[language][label][actualTitle]
                        ]);

                    }
                )
            }
        }

        return TODOS;
    }
}

module.exports = TextProcessor;