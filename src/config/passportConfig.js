const CALLBACK_URL_FACEBOOK = `${process.env.BASE_URL}/auth/facebook/callback`;
const CALLBACK_URL_TWITTER = `${process.env.BASE_URL}/auth/twitter/callback`;
const CALLBACK_URL_GOOGLE = `${process.env.BASE_URL}/auth/google/callback`;

export default {
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: CALLBACK_URL_FACEBOOK,
    profileFields: ['id', 'email', 'displayName', 'photos'],
  },
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: CALLBACK_URL_GOOGLE,
    profileFields: ['id', 'email', 'displayName', 'photos'],
  },
  twitterAuth: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: CALLBACK_URL_TWITTER,
    includeEmail: true,
  },
};
