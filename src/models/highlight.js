import { Model } from 'sequelize';
import User from './user';
import Article from './article';

/**
 * @class Highlight
 * @extends {Model}
 */
class Highlight extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns highlight model
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: User,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        articleId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: Article,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        highlightedText: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }
}

export default Highlight;
