'use strict';
const { TO_DOS } = require('../util/seeders-data');

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('to_do', TO_DOS.map(t => {
      const now = new Date();
      return { ...t, created_at: now, updated_at: now };
    })),

  down: queryInterface => queryInterface
    .bulkDelete('to_dos', null, {})
};
