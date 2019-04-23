import randomstring from 'randomstring';
import { slug } from '../utils/article';

/**
 * @name Notification
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns Notification model
 */
export default (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subjectUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notificationState: {
        type: DataTypes.ENUM('read', 'unread'),
        allowNull: false,
        defaultValue: 'unread',
      },
    },
    {
      tableName: 'notifications',
    }
  );

  Notification.beforeCreate((notification) => {
    notification.url = slug(randomstring.generate({ length: 25 }));
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Notification;
};
