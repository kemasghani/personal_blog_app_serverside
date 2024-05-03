'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define the association between User and Post
      User.hasMany(models.Post, {
        foreignKey: 'user_id', // Explicitly specify the foreign key
        as: 'posts' // Alias for the associated Post model
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User', // Use lowercase model name
  });

  return User;
};