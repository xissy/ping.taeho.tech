import config from 'config';

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import winston from 'winston';
import expressWinston from 'express-winston';

import router from './routes';

/**
 * Initialize an Express app for an API server.
 * @returns {object} the intialized express app.
 */
function initExpressApp() {
  const app = express();
  const env = app.get('env');

  app.set('port', config.server.port || 9000);
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'ejs');

  app.use(express.static(`${__dirname}/public`));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.enable('trust proxy');

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console(),
    ],
  }));

  if (env === 'production') {
    app.use(express.logger());
    app.use(express.errorHandler());
  }

  return app;
}


/**
 * Set express routers for the app.
 * @param {object} the express app.
 * @returns {object} the express app.
 */
function setRouters(app) {
  app.use('/', router);
}


/**
 * Start a server.
 */
export default function startServer() {
  const app = initExpressApp();
  setRouters(app);

  app.listen(config.server.port, () => {
    /* eslint-disable no-console */
    console.log(`NodeJS ES6 API Example `
      + `listening on port ${app.get('port')} by ${app.get('env')}`);
  });
}
