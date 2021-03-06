export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('articles', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
      type: Sequelize.TEXT(10000000),
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: [],
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
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
    totalReadTime: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    isDeletedByAuthor: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: queryInterface => queryInterface.dropTable('articles'),
};
