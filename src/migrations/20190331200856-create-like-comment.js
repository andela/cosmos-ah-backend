import { LikeComment } from '../models';

  export default {
   up: queryInterface => queryInterface.createTable(LikeComment.tableName,
     LikeComment.rawAttributes),
   down: queryInterface => queryInterface.dropTable('like_comments'),
 };