/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns article model
 */
export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tagList: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      rating: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
      favouritesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      readCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'articles',
    }
  );
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'articleUser',
      onDelete: 'CASCADE',
    });
  };
  return Article;
};
