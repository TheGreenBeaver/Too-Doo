const { getUniqueKeyName } = require('../util/sql');
const { UniqueConstraintError } = require('sequelize');
const httpStatus = require('http-status');
const models = require('../models');


function handleUniqueConstraintError(err, req, res, next) {
  if (err instanceof UniqueConstraintError) {
    const { parent } = err;
    const failedUnique = getUniqueKeyName(parent);
    const failedModel = Object.entries(models).find(([, model]) => model.getTableName() === parent.table)[0];
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ [failedUnique]: [`${failedModel} with such ${failedUnique} already exists`] });
  }

  next(err);
}

module.exports = {
  stack: [handleUniqueConstraintError],
  order: 1
};