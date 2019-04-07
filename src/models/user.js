import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns User model
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
        },
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      notification: DataTypes.BOOLEAN,
      role: DataTypes.ENUM('admin', 'author', 'user'),
    },
    {
      tableName: 'Users',
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'userArticles',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Follower, {
      foreignKey: 'userId',
      as: 'userFollowers',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Bookmark, {
      foreignKey: 'userId',
      as: 'userBookmarks',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'userNotifications',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'userComments',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Favourite, {
      foreignKey: 'userId',
      as: 'userFavourites',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      as: 'userRatings',
      onDelete: 'CASCADE',
    });
  };

  User.hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // eslint-disable-next-line max-len
  User.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
  User.generateJWT = payload => jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return User;
};
