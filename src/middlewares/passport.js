import passport from 'passport';
import { responseFormat } from '../utils/index';

const passportAuth = (req, res, next) => {
  passport.authenticate('local-login', (error, user) => {
    if (!user) {
      return res.status(400).json(responseFormat({ status: 'fail', data: 'Incorrect email or password', }));
    }
    req.user = user;
    delete user.password;
    return next();
  })(req, res, next);
};

export default passportAuth;
