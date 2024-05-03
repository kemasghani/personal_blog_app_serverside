'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define the association between Post and User
      Post.belongsTo(models.User, {
        foreignKey: 'user_id', // Explicitly specify the foreign key
        as: 'author' // Alias for the associated User model
      });
    }
  }

  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post', // Use lowercase model name
  });

  return Post;
};