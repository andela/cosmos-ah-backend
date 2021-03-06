/* eslint-disable max-len */
import bcrypt from 'bcryptjs';

const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

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
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      verificationToken: {
        type: DataTypes.STRING,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
      },
      notification: DataTypes.BOOLEAN,
      role: {
        type: DataTypes.ENUM('admin', 'author'),
        defaultValue: 'author',
      }
    },
    {
      tableName: 'users',
    },
  );

  User.beforeCreate((user) => {
    const hashedPass = hash(user.dataValues.password);
    user.password = hashedPass;
  });

  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'userArticles',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Follower, {
      foreignKey: 'userId',
      as: 'following',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Follower, {
      foreignKey: 'followerId',
      as: 'followers',
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
  User.prototype.hash = hash;
  User.prototype.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

  return User;
};
