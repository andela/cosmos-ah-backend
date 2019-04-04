export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rating', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    articleId: {
      type: Sequelize.UUID,
      references: {
        model: 'Article',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
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
  down: queryInterface => queryInterface.dropTable('Rating'),
};
