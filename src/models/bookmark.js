/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns Bookmark model
 */
export default (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    'Bookmark',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'bookmarks',
    }
  );
  Bookmark.associate = models => {
    Bookmark.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    Bookmark.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Bookmark;
};
