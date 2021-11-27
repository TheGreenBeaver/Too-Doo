const { getValidationErrJson } = require('../util/misc');
const { ValidationError } = require('sequelize');
const httpStatus = require('http-status');


function handleValidationError(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST).json(getValidationErrJson(err));
  }

  next(err);
}

function handleUnknownError(err, req, res, next) {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
}

module.exports = {
  stack: [
    handleValidationError,
    handleUnknownError
  ],
  order: 3
};