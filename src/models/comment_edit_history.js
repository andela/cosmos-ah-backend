

export default (sequelize, DataTypes) => {
  const CommentEditHistory = sequelize.define(
    'CommentEditHistory', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      commentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      commentBody: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'comment-edit-history',
      freetableName: true
    });
  CommentEditHistory.associate = (models) => {
    CommentEditHistory.belongsTo(models.Comment, {
      foriegnKey: 'commentId',
      onDelete: 'CASCADE',
      as: 'comment'
    });
  };
  return CommentEditHistory;
};
