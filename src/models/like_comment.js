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
        },
        commentId: {
          type: DataTypes.UUID,
          allowNull: false,
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