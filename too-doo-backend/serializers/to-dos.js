const { omit } = require('lodash');

function serializeToDo(data) {
  return omit(data.dataValues, 'user_id');
}

function serializeToDoShort(data) {
  return omit(data.dataValues, ['user_id', 'description']);
}

module.exports = { serializeToDo, serializeToDoShort }