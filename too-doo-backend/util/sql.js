function getFkConfig(ref, Sequelize) {
  return {
    type: Sequelize.INTEGER,
    references: {
      model: ref,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  };
}

function getUniqueKeyName(sqlData) {
  return sqlData.constraint
    .replace(`${sqlData.table}_`, '')
    .replace('_key', '');
}

function getValidationErrJson(validationResult) {
  return validationResult.errors.reduce(
    (acc, err) => {
      if (acc[err.path] == null) {
        acc[err.path] = '';
      } else {
        acc[err.path] += ' ';
      }
      acc[err.path] += err.message;
      return acc;
    }, {})
}

module.exports = {
  getFkConfig,
  getUniqueKeyName,
  getValidationErrJson
};