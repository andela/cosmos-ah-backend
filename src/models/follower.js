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
    Follower.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'following',
      onDelete: 'CASCADE',
    });
    Follower.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'followers',
      onDelete: 'CASCADE',
    });
    Follower.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles',
      onDelete: 'CASCADE',
    });
    Follower.belongsTo(models.Article, {
      foreignKey: 'followerId',
      as: 'f_articles',
      onDelete: 'CASCADE',
    });
  };
  return Follower;
};
