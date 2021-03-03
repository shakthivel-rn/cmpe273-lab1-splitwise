const Sequelize = require('sequelize');
const sequelize = require('../DatabaseConnection/connection');
const Users = require('./Users');

const Groups = sequelize.define('Groups', {
  group_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  group_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  group_image: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
}, {});
Groups.belongsToMany(Users, { through: 'Users_Groups', foreignKey: 'group_id' });

module.exports = Groups;
