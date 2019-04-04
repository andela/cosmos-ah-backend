export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Article', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.TEXT('tiny'),
      allowNull: true,
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tagList: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: [],
    },
    likes: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    favouritesCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    readCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
  down: queryInterface => queryInterface.dropTable('Article'),
};
