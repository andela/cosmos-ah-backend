import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as LinkedinStrategy } from 'passport-linkedin-oauth2';
import userController from '../controllers/authentication/social';

const twitterConfig = {
  consumerKey: 'Y7SLg4Y0eR6n3203QcpGWAVlB',
  consumerSecret: 'ua3XAGiBZinEX8toPlfOB2XNqL1MXf8VYzZapirjB6364p4K3r',
  callbackURL: 'http://localhost:4000/auth/twitter/callback',
  includeEmail: true,
};
// const twitterConfig = {
//   consumerKey: process.env.TWITTER_CONSUMER_KEY,
//   consumerSecret: process.env.WITTER_CONSUMER_SECRET,
//   callbackURL: 'http://localhost:4000/auth/twitter/callback',
//   includeEmail: true,
// };

// const linkedinConfig = {
//   clientID: process.env.LINKEDIN_CLIENTID,
//   clientSecret: process.env.LINKEDIN_CLIENTSERVICE,
//   callbackURL: 'http://localhost:4000/auth/linkedin/callback',
//   scope: ['r_emailaddress', 'r_basicprofile'],
// };
const linkedinConfig = {
  clientID: '77vhpd3l5lnv4z',
  clientSecret: 'Gl9FuRA0xpZpYf7u',
  callbackURL: 'http://localhost:4000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true,
};

export const twitterStrategy = new TwitterStrategy(
  twitterConfig,
  userController.socialCallback,
);
export const linkedinStrategy = new LinkedinStrategy(
  linkedinConfig,
  userController.socialCallback,
);
