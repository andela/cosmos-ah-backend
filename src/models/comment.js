import { Model } from 'sequelize';
import User from './user';
import Article from './article';

/**
 * @class Comment
 * @extends {Model}
 */
class Comment extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns comment model
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        articleId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Article,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }
}

export default Comment;
