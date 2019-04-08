export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('article_ratings', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    articleId: {
      type: Sequelize.UUID,
      references: {
        model: 'articles',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    value: {
      type: Sequelize.INTEGER,
      defaultValue: 1
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
  down: queryInterface => queryInterface.dropTable('article_ratings'),
};
