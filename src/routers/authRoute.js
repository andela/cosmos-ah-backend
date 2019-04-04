import { Router } from 'express';
import passport from 'passport';

const router = Router();
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api/v1/');
  },
);

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api/v1/');
  },
);
export default router;
