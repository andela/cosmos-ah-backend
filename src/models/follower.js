/**
 * @name init
 * @param {sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Returns Follower model
 */
export default (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    'Follower',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      followerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'followers',
    }
  );
  Follower.associate = (models) => {
    Follower.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });
    Follower.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Follower;
};
