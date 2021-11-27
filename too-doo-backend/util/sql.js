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

module.exports = {
  getFkConfig
};