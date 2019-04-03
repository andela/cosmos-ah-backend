import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import route from './routes/index';
import docs from '../swagger.json';
import passport from 'passport';
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

dotenv.config();
const { LINKEDIN_CLIENTID, LINKEDIN_SECRET } = process.env;

const PORT = process.env.PORT || 4000;

// Create global app object
const app = express();

// Express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', route);

// route for API documentation
app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

// catch 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch error from database and other errors
app.use((error, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
  next();
});

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENTID,
      clientSecret: LINKEDIN_SECRET,
      callbackURL: `http://localhost:${PORT}/welcome`,
      scope: ['r_emailaddress', 'r_basicprofile'],
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
