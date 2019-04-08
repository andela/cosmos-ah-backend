/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns Highlight model
 */
export default (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight',
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      articleId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      highlightedText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'highlights',
    });
  Highlight.associate = (models) => {
    Highlight.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    Highlight.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Highlight;
};
