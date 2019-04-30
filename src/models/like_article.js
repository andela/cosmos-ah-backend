/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns Like model
 */
export default (sequelize, DataTypes) => {
  const LikeArticle = sequelize.define(
    'LikeArticle',
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
      tableName: 'like_articles',
    },
  );
  LikeArticle.associate = (models) => {
    LikeArticle.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    LikeArticle.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return LikeArticle;
};
