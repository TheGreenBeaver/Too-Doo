const { compareHashed } = require('./cryptography');
const { AuthError } = require('./custom-errors');
const { AuthToken, User } = require('../models/index');
const { USER_AUTH, AUTH_TOKEN_LOG_IN } = require('./query-options');


function extractToken(req) {
  const header = req.get('Authorization');
  return header ? header.replace('Token ', '') : null;
}

async function checkAuthorization(key) {
  if (!key) {
    throw new AuthError();
  }
  return AuthToken.findByPk(key, { ...AUTH_TOKEN_LOG_IN, rejectOnEmpty: new AuthError() });
}

async function authorizeWithToken({ username, password }, res) {
  const user = await User.findOne({ where: { username }, ...USER_AUTH, rejectOnEmpty: new AuthError(true) });
  if (!compareHashed(password, user.password)) {
    throw new AuthError(true);
  } else {
    // user.createToken() does not return the fresh token
    const authToken = await AuthToken.create({ user_id: user.id });
    return res.json({ token: authToken.key });
  }
}

module.exports = {
  checkAuthorization,
  authorizeWithToken,
  extractToken
};