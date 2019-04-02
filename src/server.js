import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import docs from '../swagger.json';
import indexRouter from './routers';

config();

/**
 * Setup of the application server
 * @function startServer
 * @param {Number} port
 * @return {Promise} Resolves to the HTTP server
 */
const startServer = port =>
  new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('The server must be started with an available port'));
    }

    const app = express();
    app.set('json spaces', 2);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.get('/', indexRouter);
    app.use('/api/v1', indexRouter);

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

export default Object.assign({}, { startServer });
