import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import passportConfig from '../config/passportConfig';
import strategyCallback from './socialCallback';

const facebookStrategy = new FacebookStrategy(passportConfig.facebookAuth, strategyCallback);
const googleStrategy = new GoogleStrategy(passportConfig.googleAuth, strategyCallback);
const twitterStrategy = new TwitterStrategy(passportConfig.twitterAuth, strategyCallback);

export default {
  facebookStrategy,
  googleStrategy,
  twitterStrategy
};
