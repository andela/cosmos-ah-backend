export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    notificationState: {
      type: Sequelize.ENUM('read', 'unread'),
      allowNull: false,
      defaultValue: 'unread',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('notifications'),
};
