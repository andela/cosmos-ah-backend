import { Router } from 'express';
import login from '../controllers/authentication/user';
import passport from '../middlewares/passport';
import { AddArticles, UpdateArticle, DeleteArticle } from '../controllers/article';
import checkFields from '../middlewares/auth/loginValidator';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
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

router.post('/login', checkFields, passport, login);

export default router;
