const { omit } = require('lodash');

function serializeToDo(data) {
  return omit(data.dataValues, 'user_id');
}

module.exports = { serializeToDo }