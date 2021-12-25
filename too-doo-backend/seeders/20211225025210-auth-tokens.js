'use strict';

const { AUTH_TOKENS } = require('../util/seeders-data');

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('auth_token', AUTH_TOKENS.map(a => ({ ...a, created_at: new Date() }))),

  down: queryInterface => queryInterface
    .bulkDelete('auth_token', null, {})
};
