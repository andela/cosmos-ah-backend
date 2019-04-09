export default {
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'email', 'displayName', 'photos', 'name'],
  },
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/api/v1/auth/google/callback`,
    profileFields: ['id', 'email', 'displayName', 'photos'],
  },
};
