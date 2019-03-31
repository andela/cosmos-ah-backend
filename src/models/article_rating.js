import { Model } from 'sequelize';
import User from './user';
import Article from './article';

/**
 * @class ArticleRating
 * @extends {Model}
 */
class ArticleRating extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns ArticleRating model
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
          references: {
            model: User,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        articleId: {
          type: DataTypes.UUID,
          references: {
            model: Article,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
      },
      { sequelize }
    );
  }
}

export default ArticleRating;
