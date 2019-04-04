/* eslint-disable require-jsdoc */
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

const twitterHandshake = passport.authenticate('twitter');

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: 'Y7SLg4Y0eR6n3203QcpGWAVlB',
    consumerSecret: 'ua3XAGiBZinEX8toPlfOB2XNqL1MXf8VYzZapirjB6364p4K3r',
    callbackURL: 'http://localhost:4000/api/v1/auth/twitter/callback',
    includeEmail: true,
  },
  (token, tokenSecret, profile, done) => done(null, profile),
);
const twitterCallback = passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login',
});

export { twitterStrategy, twitterHandshake, twitterCallback };
