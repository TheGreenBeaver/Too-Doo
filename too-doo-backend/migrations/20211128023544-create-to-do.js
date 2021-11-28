'use strict';
const { getFkConfig } = require('../util/sql');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('to_do', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: getFkConfig('td_user', Sequelize)
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('to_do');
  }
};