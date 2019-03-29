import { Sequelize, Model } from 'sequelize';
/**
 *
 *
 * @class User
 * @extends {Model}
 */
class User extends Model {}

export default User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
        msg: 'field can be alphanumeric only',
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        msg: 'field must be email',
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        msg: 'field can be alphanumeric only',
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {},
    },
    bio: {
      type: Sequelize.STRING,
    },
    image_url: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
        msg: 'field can be url only',
      },
    },
    notification: Sequelize.BOOLEAN,
    role: Sequelize.ENUM('admin', 'author', 'user'),
  },
  { sequelize }
);
