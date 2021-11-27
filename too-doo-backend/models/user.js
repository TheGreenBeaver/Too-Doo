'use strict';
const {
  Model
} = require('sequelize');
const { buildValidate, VALIDATIONS } = require('../util/validation');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.AuthToken, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,

      validate: buildValidate([
          VALIDATIONS.required,
          { name: VALIDATIONS.len, args: [0, 50] }
        ], 'username'
      )
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,

      validate: buildValidate([
          VALIDATIONS.required,
          { name: VALIDATIONS.len, args: [0, 100] }
        ], 'password'
      )
    }
  }, {
    sequelize,
    modelName: 'td_user',
    timestamps: false
  });
  return User;
};