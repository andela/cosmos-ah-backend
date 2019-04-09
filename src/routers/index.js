import { Router } from 'express';
import passport from 'passport';
import { AddArticles, UpdateArticle, DeleteArticle } from '../controllers/article';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the Authors Haven API',
}),);

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

// Route for facebook Authentication
router.get(
  '/auth/facebook',
  passport.authenticate(
    'facebook', { authType: 'rerequest', scope: ['email'] },
  ),
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/login' }),
  (req, res) => {
    res.redirect('/api/v1');
  },
);

// Route for google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }),
  (req, res) => {
    res.redirect('/api/v1');
  },
);

export default router;
