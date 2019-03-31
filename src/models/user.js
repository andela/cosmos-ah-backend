import { Model } from 'sequelize';
/**
 *
 *
 * @class User
 * @extends {Model}
 */
class User extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns User model
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        full_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is: ['^[a-z]+$', 'i'],
            msg: 'field can be alphanumeric only',
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
            msg: 'field must be email',
          },
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isAlphanumeric: true,
            msg: 'field can be alphanumeric only',
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {},
        },
        bio: {
          type: DataTypes.STRING,
        },
        image_url: {
          type: DataTypes.STRING,
          validate: {
            isUrl: true,
            msg: 'field can be url only',
          },
        },
        notification: DataTypes.BOOLEAN,
        role: DataTypes.ENUM('admin', 'author', 'user'),
      },
      { sequelize }
    );
  }
}
export default User;
