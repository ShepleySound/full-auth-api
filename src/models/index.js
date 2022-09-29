'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users/model.js');
const foodModel = require('./food/model');
const bookModel = require('./books/model');
const Collection = require('./data-collection');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

const users = userModel(sequelize, DataTypes);
const food = foodModel(sequelize, DataTypes);
const books = bookModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: users,
  food: new Collection(food),
  books: new Collection(books),
};
