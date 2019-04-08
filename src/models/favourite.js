/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns Favourite model
 */
export default (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite',
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
      tableName: 'favourites',
    });
  Favourite.associate = (models) => {
    Favourite.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    Favourite.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Favourite;
};
