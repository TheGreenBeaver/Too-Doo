const fs = require('fs');
const path = require('path');

/**
 *
 * @return {string} the env to use
 */
function getEnv() {
  return process.env.NODE_ENV || 'dev';
}

/**
 *
 * Get all files containing meaningful module data
 * @param {string} dirname
 * @param {string} filename
 * @return {string[]} list of file names
 */
function getMeaningfulFiles(dirname, filename) {
  const basename = path.basename(filename);
  return fs
    .readdirSync(dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && path.extname(file) === '.js');
}

/**
 * Get the absolute path to directory `lvl` directories above `dirname`
 * @param {string} dirname
 * @param {number=} [lvl = 1] how many directories to go up
 * @return {string}
 */
function getParentDir(dirname, lvl = 1) {
  const dirsList = dirname.split(path.sep);
  return path.join(...dirsList.slice(0, dirsList.length - lvl));
}

module.exports = {
  getEnv,
  getMeaningfulFiles,
  getParentDir
};