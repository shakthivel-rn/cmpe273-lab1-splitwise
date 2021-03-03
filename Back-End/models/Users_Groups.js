const Sequelize = require('sequelize');
const sequelize = require('../DatabaseConnection/connection');
const Users = require('./Users');
const Groups = require('./Groups');

module.exports = () => {
  const UsersGroups = sequelize.define('Users_Groups', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {});
  UsersGroups.belongsTo(Users, { foreignKey: 'user_id' });
  UsersGroups.belongsTo(Groups, { foreignKey: 'group_id' });
  return UsersGroups;
};
