const { checkAuthorization, extractToken } = require('../util/common-operations');


async function handleAuthorizedRequest(req, res, next) {
  try {
    const key = extractToken(req);
    const authToken = await checkAuthorization(key);
    req.user = authToken.user;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  stack: [handleAuthorizedRequest],
  order: 1
};