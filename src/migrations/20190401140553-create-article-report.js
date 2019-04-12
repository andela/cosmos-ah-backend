export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('article_reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
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
    reporterId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    reportCategory: {
      type: Sequelize.STRING,
      defaultValue: 'others'
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
