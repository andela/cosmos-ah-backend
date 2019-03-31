import { Model } from 'sequelize';
import User from './user';

/**
 * @class Follower
 * @extends {Model}
 */
class Follower extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns Follower model
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
        followerId: {
          type: DataTypes.UUID,
          references: {
            model: User,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
      },
      { sequelize }
    );
  }
}

export default Follower;
