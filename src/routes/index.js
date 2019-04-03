import express from 'express';
import passport from 'passport';

const router = express.Router();

// router.get('/auth/linkedIn', userController.linkedInAuth);

//and then authenticate as:

router.get(
  '/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function(req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);
//the login callback:

router.get(
  '/welcomse',
  passport.authenticate('linkedin', function(req, res) {
    res.status(200).json({
      message: 'Welcome to the home route',
    });
  })
);

router.get('success-linkedin', (req, res) => {
  res.status(200).json({
    message: 'registration successful',
  });
});

router.get('/welcome');

export default router;
