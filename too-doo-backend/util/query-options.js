const { User } = require('../models');

const userBasicAttrs = ['id', 'username'];
const userAuthAttrs = ['id', 'password'];

const DUMMY = {
  attributes: ['id']
};

const USER_BASIC = {
  attributes: userBasicAttrs
};
const USER_AUTH = {
  attributes: userAuthAttrs
};

const AUTH_TOKEN_LOG_IN = {
  attributes: ['key'],
  include: [
    {
      model: User,
      as: 'user',
      attributes: userBasicAttrs
    }
  ]
};

module.exports = {
  DUMMY,

  USER_BASIC,
  USER_AUTH,

  AUTH_TOKEN_LOG_IN,
}

