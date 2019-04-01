export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('article_reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      articleId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
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
  down: queryInterface => queryInterface.dropTable('article_reports'),
};
