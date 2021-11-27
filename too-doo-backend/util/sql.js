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

module.exports = {
  getFkConfig,
  getUniqueKeyName
};