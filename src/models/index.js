import User from './user';
import Article from './article';
import Comment from './comment';

// Define Model Relationships

Article.belongsTo(User); // Multiple Articles belongs to a User
Article.hasMany(Comment); // An Article can have multiple Comments

Comment.belongsTo(Article); // Multiple Comments belongs to a User

export default {
  // Export Models
  User,
  Article,
  Comment,
};
