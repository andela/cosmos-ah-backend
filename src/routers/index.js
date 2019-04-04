import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the Authors Haven API',
}),);

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api/v1/');
  },
);

export default router;
