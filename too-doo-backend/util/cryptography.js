const crypto = require('crypto');
const { getVar } = require('./misc');


/**
 *
 * @param {string} value a string to encrypt
 * @returns {string} hmac256-hashed string
 */
function hash(value) {
  const hmac = crypto.createHmac('sha256', getVar('SECRET_KEY'), { encoding: 'utf8' });
  hmac.update(value);
  return hmac.digest('hex');
}

/**
 *
 * @param {string} plain a non-encrypted string
 * @param {string} hashed
 * @returns {boolean} true if the plain string gives the same hash
 */
function compareHashed(plain, hashed) {
  return hash(plain) === hashed;
}

module.exports = {
  hash, compareHashed
};