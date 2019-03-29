import { Model } from 'sequelize';
import User from './user';

/**
 * @class Article
 * @extends {Model}
 */
class Article extends Model {
  /**
   * @name init
   * @param {sequelize} sequelize
   * @param {DataTypes} DataTypes
   * @returns {Model} Returns article model
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          primaryKey: true,
          allowNull: false,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
          references: {
            model: User,
            key: 'id',
            deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tagList: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tags: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          defaultValue: [],
        },
        likes: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: [],
        },
        rating: {
          type: DataTypes.ARRAY(DataTypes.JSONB),
          defaultValue: [],
        },
        favouritesCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        readCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      { sequelize }
    );
  }
}

export default Article;