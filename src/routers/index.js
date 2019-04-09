import { Router } from 'express';
import passport from 'passport';
import passportAuth from '../middlewares/passport';
import { AddArticles, UpdateArticle, DeleteArticle } from '../controllers/article';
import checkFields from '../middlewares/auth/loginValidator';
import socialRedirect from '../controllers/authentication/socialRedirect';
import { login, createUser } from '../controllers/authentication/user';
import checkBody from '../middlewares/signUpValidator';


const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the base url',
  });
});

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

router.post('/login', checkFields, passportAuth, login);

// Route for facebook Authentication
router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/login' }), socialRedirect);


// Route for google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }), socialRedirect);

/**
 * Resource handling signup
 * @name router:/signup
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} CreateUser - Express path
 * @returns Response Object
 */

router
  .post('/signup', checkBody, createUser);

// route for twitter authentication
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login', successRedirect: '/api/v1' }));


router.post('/login', checkFields, passportAuth, login);

export default router;
