import { Router } from 'express';
import passport from 'passport';
import passportAuth from '../middlewares/passport';
import bookmarkValidation from '../middlewares/bookmark';
import {
  addArticle,
  editArticle,
  deleteArticle,
  reportArticle,
  bookmarkArticle,
  rateArticle,
  editArticleTag
} from '../controllers/article';
import checkFields from '../middlewares/auth/loginValidator';
import Auth from '../middlewares/authenticator';
import socialRedirect from '../controllers/authentication/socialRedirect';
import {
  login,
  createUser,
  verifyUser,
  linkedinUser,
  linkedinCallback,
  viewUser,
} from '../controllers/authentication/user';
import checkBody from '../middlewares/signUpValidator';
import likeArticle from '../controllers/like';
import articleValidation, {
  verifyArticle,
  isAuthor,
  articleReportValidation,
  articleTagValidation,
  validateRating,
  checkIfAuthoredBySameUser
} from '../middlewares/articles';
import { checkParam } from '../middlewares/checkParam';
import checkEditBody from '../middlewares/editProfileValidator';
import { editUser } from '../controllers/editUser';
import { followUser } from '../controllers/follower';
import getAuthors from '../controllers/authors';
import { Article } from '../models';


const router = Router();

router.get('/', (req, res) => res.status(200).json({
  status: 'success',
  data: 'Welcome to the Author\'s Haven API',
}));

router
  .route('/articles/:id/like')
  .patch(checkParam, Auth.authenticateUser, verifyArticle, likeArticle);

/**
 * Resource handling articles
 * @name router:/articles/:id?
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} addArticle - Express path
 * @param {function} deleteArticle - Express path
 * @param {function} editArticle - Express path
 * @returns Response Object
 */
router
  .route('/articles/:id?')
  .post(Auth.authenticateUser, articleValidation, addArticle)
  .delete(checkParam, Auth.authenticateUser, verifyArticle, isAuthor, deleteArticle)
  .put(checkParam, Auth.authenticateUser, articleValidation, verifyArticle, isAuthor, editArticle);

router
  .post('/login', checkFields, passportAuth, login)
  .post('/signup', checkBody, createUser)
  .get('/verify/:id/:verificationToken', verifyUser);

router
  .route('/articles/:articleId/escalate')
  .post(articleReportValidation, Auth.authenticateUser, reportArticle);

//  Route for adding tags to an article
router.put('/articles/tags/:id', Auth.authenticateUser, articleTagValidation, editArticleTag);


// Route for facebook Authentication
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['email'],
  }),
);

//  Route for adding tags to an article
router.put('/articles/tags/:id', Auth.authenticateUser, editArticleTag);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/login' }),
  socialRedirect,
);

// Route for google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }),
  socialRedirect,
);

router.get('/auth/linkedin/callback', linkedinCallback);
router.get('/auth/linkedin', linkedinUser);

// Route for user following and unfollowing
router.post('/followers/:id/follow', checkParam, Auth.authenticateUser, followUser);

/**
 * Resource handling signup
 * @name router:/signup
 * @function
 * @memberof module:Express.Router
 * @inner
 * @param {function} CreateUser - Express path
 * @returns Response Object
 */

// Route for editing a profile
router.put('/profile/edit', Auth.authenticateUser, checkEditBody, editUser);

// Route for viewing a profile details
router.get('/profile/view/:id', Auth.authenticateUser, viewUser);

// route for twitter authentication
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/api/v1/auth/login' }),
  socialRedirect,
);

router.get(
  '/article/:articleId/bookmark',
  Auth.authenticateUser,
  bookmarkValidation,
  bookmarkArticle,
);

router.get('/authors', Auth.authenticateUser, getAuthors);

router
  .route('/articles/:articleId/ratings')
  .post(Auth.authenticateUser,
    validateRating,
    checkIfAuthoredBySameUser(Article),
    rateArticle);

export default router;
