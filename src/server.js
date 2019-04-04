import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import passport from 'passport';
import session from 'express-session';
import docs from '../swagger.json';
import indexRouter from './routers';
import authRoute from './routers/authRoute';
import { twitterStrategy, linkedinStrategy } from './config/passportConfig';

let httpServer;

/**
 * Setup of the application server
 * @function startServer
 * @param {Number} port
 * @return {Promise} Resolves to the HTTP server
 */
export const startServer = port => new Promise((resolve, reject) => {
  if (!port) {
    reject(new Error('The server must be started with an available port'));
  }

  const app = express();
  httpServer = http.createServer(app);
  app.set('json spaces', 2);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
  );

  passport.use(twitterStrategy);
  passport.use(linkedinStrategy);
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    const { username, displayName } = user;
    console.log({ displayName, username });

    done(null, user);
  });

  app.use('/api/v1', indexRouter);
  app.use('/route', authRoute);
  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/api/v1/');
    },
  );

  app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  app.use((error, res, next) => {
    res.status(error.status || 500).json({
      error: {
        message: error.message,
      },
    });
    next();
  });

  const server = app.listen(port, () => resolve(server));
});

export const closeServer = () => new Promise((resolve, reject) => {
  httpServer.close((err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});
