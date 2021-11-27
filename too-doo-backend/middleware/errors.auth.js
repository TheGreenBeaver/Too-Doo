const { AuthError } = require('../util/custom-errors');
const httpStatus = require('http-status');
const { ERR_FIELD } = require('../config/settings');


function handleUnauthorizedError(err, req, res, next) {
  if (err instanceof AuthError) {
    return err.credentials
      ? res.status(httpStatus.BAD_REQUEST).json({ [ERR_FIELD]: ['Invalid credentials'] })
      : res.status(httpStatus.UNAUTHORIZED).end();
  }

  next(err);
}

module.exports = {
  stack: [handleUnauthorizedError],
  order: 2
};