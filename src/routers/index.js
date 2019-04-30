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
  editArticleTag,
  rateArticle,
  publishArticle,
  getReadingStats
} from '../controllers/article';
import { addComment, editComment, getAllComments, getAComment } from '../controllers/comment';
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
import likeArticle from '../controllers/likeArticle';
import {
  articleValidation,
  verifyArticle,
  isAuthor,
  getArticleHandler,
  articleReportValidation,
  articleTagValidation,
  articleRatingValidation,
  checkQueryParams,
} from '../middlewares/articles';
import { checkParam } from '../middlewares/checkParam';
import checkEditBody from '../middlewares/editProfileValidator';
import { editUser } from '../controllers/editUser';
import { followAndUnfollowUser, getFollowing, getFollowers } from '../controllers/follower';
import getAuthors from '../controllers/authors';
import highlightArticle from '../controllers/highlight';
import { commentValidation, verifyComment } from '../middlewares/comments';
import { likeComment } from '../controllers/likeComment';
import { forgotPassword, resetPassword } from '../controllers/authentication/passwordReset';
import resetFieldValidation from '../middlewares/auth/resetPassword';
import { trimBody } from '../middlewares';
import { searchArticle } from '../controllers/search';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the Authors Haven API',
}),
);

router
  .route('/articles/:id/like')
  .patch(checkParam, Auth.authenticateUser, verifyArticle, likeArticle);
router.route('/articles/:id/highlight').post(Auth.authenticateUser, checkParam, highlightArticle);

router
  .route('/comments/:id/like')
  .patch(checkParam, Auth.authenticateUser, verifyComment, likeComment);

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
  .get(checkQueryParams, Auth.authenticateUser, getArticleHandler)
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


// Routes for password reset
router
  .post('/forgot-password', forgotPassword)
  .put('/password-reset/:resetToken', resetFieldValidation, resetPassword);

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

router
  .route('/articles/:articleId/comments')
  .post(Auth.authenticateUser, commentValidation, addComment)
  .get(Auth.authenticateUser, getAllComments);

router
  .route('/articles/:articleId/comments/:commentId')
  .get(Auth.authenticateUser, getAComment)
  .put(Auth.authenticateUser, trimBody, commentValidation, editComment);

// Route for user following and unfollowing
router.post('/followers/:id/follow', checkParam, Auth.authenticateUser, followAndUnfollowUser);
router.get('/followings', Auth.authenticateUser, getFollowing);
router.get('/followers', Auth.authenticateUser, getFollowers);


// Route for editing a profile
router.put('/profile/edit', Auth.authenticateUser, checkEditBody, editUser);

// Route for viewing a profile
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

router.post('/articles/:articleId/ratings', Auth.authenticateUser, articleRatingValidation, rateArticle);

router.get('/search/articles', searchArticle);

router.patch(
  '/articles/:articleId/publish',
  Auth.authenticateUser,
  verifyArticle,
  isAuthor,
  publishArticle,
);

router.get('/user-reading-stats', Auth.authenticateUser, getReadingStats);

router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Incorrect API endpoint'
  });
});

export default router;
