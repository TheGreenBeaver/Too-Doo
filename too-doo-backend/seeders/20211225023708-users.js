'use strict';
const { USERS } = require('../util/seeders-data');
const { hash } = require('../util/cryptography');

module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('td_user', USERS.map(u => ({ ...u, password: hash(u.password) }))),

  down: queryInterface => queryInterface
    .bulkDelete('td_user', null, {})
};