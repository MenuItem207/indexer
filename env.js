/**
 *  relative path to index.js file
 *  read and write paths are different because for some reason the write path doesn't work when importing the json
 */
const READ_PATH_TO_INDEXJS = '../../../src/index.js';
const WRITE_PATH_TO_INDEXJS = READ_PATH_TO_INDEXJS.replace('../../../', '.././');

/**
 * legacy window.translations object
 * TODO: copy-paste the legacy object here if you want to convert into a json file
 * i.e
 * legacy_obj = {};
 */
const legacy_obj = undefined;

module.exports = { READ_PATH_TO_INDEXJS, WRITE_PATH_TO_INDEXJS, legacy_obj };