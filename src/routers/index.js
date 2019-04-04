/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { AddArticles, UpdateArticle, DeleteArticle } from '../controllers/article';

const router = Router();

router.get('/api/v1', (req, res) => res.status(200).json({
  message: 'Welcome to the Authors Haven API',
}));

/**
 * Resource handling articles
 * @name router:/articles/:id?
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} AddArticles - Express path
 * @param {function} DeleteArticle - Express path
 * @param {function} UpdateArticle - Express path
 * @returns Response Object
 */
router
  .route('/articles/:id?')
  .post(AddArticles)
  .delete(DeleteArticle)
  .patch(UpdateArticle);

export default router;
