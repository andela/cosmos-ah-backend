// import { Strategy as TwitterStrategy } from 'passport-twitter';
// import { Strategy as LinkedinStrategy } from 'passport-linkedin-oauth2';
// import userController from '../controllers/authentication/twitter';

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
//   state: true,
// };

// export const twitterStrategy = new TwitterStrategy(
//   twitterConfig,
//   userController.socialCallback,
// );
// export const linkedinStrategy = new LinkedinStrategy(
//   linkedinConfig,
//   userController.socialCallback,
// );
