import User from './user';
import Article from './article';
import Comment from './comment';
import Notification from './notification';
import Bookmark from './bookmark';
import Favourite from './favourite';
import Highlight from './highlight';
import Rating from './article_rating';
import Follower from './follower';

// Define Model Relationships

Article.belongsTo(User); // Multiple Articles belongs to a User
Article.hasMany(Comment); // An Article can have multiple Comments

Comment.belongsTo(Article); // Multiple Comments belongs to a User
Notification.belongsTo(User); // Multiple Notifications belongs to a User

Follower.belongsTo(User); // A single follower belongs to a user
User.hasMany(Follower); // User can have multiple followers

Bookmark.belongsTo(Article); // A bookmark can belong to an article
Article.hasMany(Bookmark); // An Article can have multiple bookmarks
User.hasMany(Bookmark);

Rating.belongsToMany(User);
User.hasMany(Rating);

export default {
  // Export Models
  User,
  Article,
  Comment,
  Notification,
  Bookmark,
  Rating,
  Favourite,
  Highlight,
  Follower,
};
