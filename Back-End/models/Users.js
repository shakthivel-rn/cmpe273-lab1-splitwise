const Sequelize = require('sequelize');
const sequelize = require('../DatabaseConnection/connection');
const Groups = require('./Groups');

const Users = sequelize.define('Users', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  phone_number: {
    type: Sequelize.STRING(50),
  },
  default_currency: {
    type: Sequelize.STRING(3),
  },
  timezone: {
    type: Sequelize.STRING(50),
  },
  language: {
    type: Sequelize.STRING(50),
  },
  user_image: {
    type: Sequelize.BLOB,
  },
}, {});
Users.belongToMany(Groups, { through: 'Users_Groups', foreignKey: 'user_id' });

module.exports = Users;
