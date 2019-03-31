import { Model } from 'sequelize';
import User from './user';
import Article from './article';

/**
 * @class Bookmark
 * @extends {Model}
 */
class Bookmark extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns bookmark model
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
      },
      { sequelize }
    );
  }
}

export default Bookmark;
