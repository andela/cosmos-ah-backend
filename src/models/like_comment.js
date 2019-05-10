/**
  * @name init
  * @param {sequelize} sequelize
  * @param {DataTypes} DataTypes
  * @returns {Model} Returns LikeArticle model
  */
export default (sequelize, DataTypes) => {
  const LikeComment = sequelize.define(
    'LikeComment',
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
        references: {
          model: 'users',
          key: 'id',
        },
      },
      commentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'comments',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'like_comments',
    },
  );
  LikeComment.associate = (models) => {
    LikeComment.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      as: 'comment',
      onDelete: 'CASCADE',
    });
    LikeComment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return LikeComment;
};
