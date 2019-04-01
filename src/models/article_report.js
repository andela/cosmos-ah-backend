import { Model } from 'sequelize';
import Article from './article';

/**
 * @class ArticleReport
 * @extends {Model}
 */
class ArticleReport extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns ArticleReport model
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        articleId: {
          type: DataTypes.UUID,
          references: {
            model: Article,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        description: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
      },
      { sequelize }
    );
  }
}

export default ArticleReport;
