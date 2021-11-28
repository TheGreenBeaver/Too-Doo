'use strict';

const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { getMeaningfulFiles, getEnv, getParentDir } = require('../util/misc');

const env = getEnv();
let config;
try {
  config = require(path.join(getParentDir(__dirname), 'config', 'config'));
} catch {
  config = require('../config/config')[env];
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
getMeaningfulFiles(__dirname, __filename)
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;

module.exports = db;
