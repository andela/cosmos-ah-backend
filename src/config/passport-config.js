import passport from 'passport';
import LinkedInStrategy from 'passport-linkedin-oauth2';
import dotenv from 'dotenv';

dotenv.config();
const { LINKEDIN_CLIENTID, LINKEDIN_SECRET } = process.env;

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENTID,
      clientSecret: LINKEDIN_SECRET,
      callbackURL: '/welcome',
      state: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      process.nextTick(() => done(null, profile));
    }
  )
);
