let CALLBACK_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/auth/facebook/callback`;

if (process.env.NODE_ENV === 'production') {
  CALLBACK_URL = `https://${process.env.HOST}:${process.env.PORT}/api/v1/auth/facebook/callback`;
}

export default {
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: CALLBACK_URL,
    profileFields: ['id', 'email', 'displayName', 'photos', 'name'],
  },
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: CALLBACK_URL,
    profileFields: ['id', 'email', 'displayName', 'photos'],
  },
  twitterAuth: {
    consumerKey: 'Y7SLg4Y0eR6n3203QcpGWAVlB',
    consumerSecret: 'ua3XAGiBZinEX8toPlfOB2XNqL1MXf8VYzZapirjB6364p4K3r',
    callbackURL: 'http://localhost:4000/api/v1/auth/twitter/callback',
    includeEmail: true,
  }
};
