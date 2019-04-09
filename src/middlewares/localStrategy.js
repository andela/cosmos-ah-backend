import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models';
import Auth from '../utils/utils';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user.id);
});

const passportConfig = () => {
  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (async (req, email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false);
        }
        if (!Auth.comparePassword(password, user.password)) {
          return done(null, false);
        }
        return done(null, user.dataValues);
      } catch (error) {
        return done(error);
      }
    }
    )
  ));
};

export default passportConfig;
