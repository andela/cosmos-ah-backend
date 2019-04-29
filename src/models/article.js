import { computeArticleReadingTime } from '../utils/article';

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
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
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
      totalReadTime: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      isDeletedByAuthor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'articles',
      hooks: {
        beforeCreate(article) {
          const totalReadTime = computeArticleReadingTime(
            article.get('body'),
          );
          article.set('totalReadTime', totalReadTime);
        },
        beforeUpdate(article) {
          const totalReadTime = computeArticleReadingTime(
            article.get('body'),
          );
          article.set('totalReadTime', totalReadTime);
        },
      },
    },
  );
  Article.associate = (models) => {
    Article.belongsToMany(models.User, {
      foreignKey: 'userId',
      as: 'articleUser',
      through: 'article_user',
      onDelete: 'CASCADE',
    });
    Article.hasMany(models.Like, {
      foreignKey: 'userId',
      as: 'userLikes',
      onDelete: 'CASCADE',
    });
    Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      as: 'comments',
    });
  };
  return Article;
};
