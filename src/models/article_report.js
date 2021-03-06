/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns ArticleReport model
 */
export default (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'Report',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reporterId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reportCategory: {
        type: DataTypes.STRING,
        defaultValue: 'others'
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'article_reports',
    }
  );
  Report.associate = (models) => {
    Report.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
  };
  return Report;
};
