import bcrypt from 'bcryptjs';

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
        validate: {
          is: ['^[a-z]+$', 'i'],
          // msg: 'field can be alphanumeric only',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          // msg: 'field must be email',
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
          // msg: 'field can be alphanumeric only',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // is: /^(?=.*\d)$/,
          min: 6,
          // msg: 'Password length must have a minimum of 6 characters',
        },
      },
      bio: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
          // msg: 'field can be url only',
        },
      },
      notification: DataTypes.BOOLEAN,
      role: DataTypes.ENUM('admin', 'author', 'user'),
    },
    {
      tableName: 'users',
    }
  );

  // eslint-disable-next-line func-names
  const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

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

  return User;
};
