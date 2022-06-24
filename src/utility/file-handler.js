const fs = require('fs');

/**
 * handles interfacing (reading / writing) of file
 */
class FileHandler {
    static PATH = 'C://Users/admin/Documents/work/repo/src/index.js'; // TODO: update path

    /**
     * @returns {String} plaintext of index.js 
     */
    static getFileText() {
        return fs.readFileSync(FileHandler.PATH, 'utf-8');
    }

    /**
     * @returns {Array} of plaintext of index.js
     */
    static getFileTextLines() {
        return FileHandler.getFileText().split(/\r?\n/);
    }

    /**
     * writes file
     */
    static writeFile(arr_text) {
        let newText = arr_text.join("\n");

        fs.writeFile(FileHandler.PATH, newText, () => { });
    }

}
module.exports = FileHandler;