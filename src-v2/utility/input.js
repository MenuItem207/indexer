/**
 * function similar to python input but async
 * 
 * @param {String} inputString 
 */
async function input(inputString) {
    return new Promise(
        resolve => {
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readline.question(inputString, response => {
                readline.close();
                resolve(response);
            })
        }
    )
}

module.exports = input;