'use strict';
const {
  Model
} = require('sequelize');
const { buildValidate, VALIDATIONS } = require('../util/validation');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  ToDo.init({
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,

      validate: buildValidate([
        VALIDATIONS.required,
        { name: VALIDATIONS.len, args: [0, 32] }
      ])
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,

      validate: buildValidate([
        VALIDATIONS.required,
        { name: VALIDATIONS.len, args: [0, 500] }
      ])
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ToDo',
    tableName: 'to_do',
    timestamps: true
  });
  return ToDo;
};