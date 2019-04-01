export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      notification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'author', 'user'),
        defaultValue: 'user',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }),

  down: queryInterface => queryInterface.dropTable('users'),
};
