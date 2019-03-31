import { Model } from 'sequelize';
import User from './user';

/**
 * @class Notification
 * @extends {Model}
 */
class Notification extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns notiffication model
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
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        notificationState: {
          type: DataTypes.ENUM('read', 'unread'),
          allowNull: false,
          defaultValue: 'unread',
        },
      },
      { sequelize }
    );
  }
}

export default Notification;
