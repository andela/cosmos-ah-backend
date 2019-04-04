import { articleExist } from '../utils';

/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns ArticleRating model
 */
export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          max: 5,
          min: 1
        }
      },
    },
    {
      tableName: 'article_ratings',
      hooks: {
        async beforeCreate(rating) {
          const recordExist = await articleExist(this, rating);
          if (recordExist) {
            // user has already rated this article
            throw new Error('You have already rated this article');
          }
        },
        async beforeUpdate(rating) {
          const recordExist = await articleExist(this, rating);
          if (recordExist) {
            throw new Error('You have already rated this article');
          }
        }
      }
    }
  );
  Rating.associate = (models) => {
    Rating.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'articleRatings',
      onDelete: 'CASCADE',
    });
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Rating;
};
