import { Model } from 'sequelize';
import User from './user';
import Article from './article';

/**
 * @class Favourite
 * @extends {Model}
 */
class Favourite extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns Favourite model
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

export default Favourite;
