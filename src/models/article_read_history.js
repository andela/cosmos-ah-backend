
/**
 * @function
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns a database model
 */
export default (sequelize, DataTypes) => {
  const ArticleReadHistory = sequelize.define(
    'ArticleReadHistory',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      articleId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: 'article_read_histories'
    }
  );
  ArticleReadHistory.associate = (models) => {
    const { Article, User } = models;
    ArticleReadHistory.belongsTo(Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    ArticleReadHistory.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return ArticleReadHistory;
};
