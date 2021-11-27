'use strict';
const { getFkConfig } = require('../util/sql');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_token', {
      key: {
        allowNull: false,
        type: Sequelize.STRING(40),
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      user_id: getFkConfig('td_user', Sequelize)
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auth_token');
  }
};