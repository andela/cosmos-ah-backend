import { Router } from 'express';
import passport from 'passport';
import socialController from '../controllers/authentication/socialController';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the Authors Haven API',
}),);

// Route for facebook Authentication
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] }),
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  socialController.socialRedirect,
);

// Route for google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/login' }),
  socialController.socialRedirect,
);

export default router;
