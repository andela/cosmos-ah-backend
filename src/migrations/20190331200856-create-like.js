export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('likes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    articleId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'articles',
        key: 'id',
      },
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
  down: queryInterface => queryInterface.dropTable('likes'),
};
