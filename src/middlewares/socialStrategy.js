import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passportConfig from '../config/passportConfig';
import strategyCallback from './socialCallback';

const facebookStrategy = new FacebookStrategy(passportConfig.facebookAuth, strategyCallback);
const googleStrategy = new GoogleStrategy(passportConfig.googleAuth, strategyCallback);

export default {
  facebookStrategy,
  googleStrategy,
};
