let CALLBACK_URL_FACEBOOK = `http://${process.env.HOST}:${
  process.env.PORT
}/api/v1/auth/facebook/callback`;
let CALLBACK_URL_TWITTER = `http://${process.env.HOST}:${
  process.env.PORT
}/api/v1/auth/twitter/callback`;
let CALLBACK_URL_GOOGLE = `http://${process.env.HOST}:${
  process.env.PORT
}/api/v1/auth/google/callback`;

if (process.env.NODE_ENV === 'production') {
  CALLBACK_URL_FACEBOOK = `https://${process.env.HOST}:${
    process.env.PORT
  }/api/v1/auth/facebook/callback`;
  CALLBACK_URL_TWITTER = `https://${process.env.HOST}:${
    process.env.PORT
  }/api/v1/auth/twitter/callback`;
  CALLBACK_URL_GOOGLE = `https://${process.env.HOST}:${
    process.env.PORT
  }/api/v1/auth/facebook/callback`;
}

export default {
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: CALLBACK_URL_FACEBOOK,
    profileFields: ['id', 'email', 'displayName', 'photos', 'name'],
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
