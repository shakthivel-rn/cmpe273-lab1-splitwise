module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Users_Groups', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'group_id',
      },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: async (queryInterface) => queryInterface.dropTable('Users_Groups'),
};
