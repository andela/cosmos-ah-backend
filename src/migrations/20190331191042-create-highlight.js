export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('highlights', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      allowNull: false,
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
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'articles',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    highlightedText: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('highlights'),
};
