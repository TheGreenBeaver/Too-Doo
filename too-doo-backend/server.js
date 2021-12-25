const express = require('express');
const useMiddleware = require('./middleware');
const useRouting = require('./routing');


const app = express();

useMiddleware(app, { prefix: 'app-level.' });

useRouting(app);

useMiddleware(app, { prefix: 'errors.' });

module.exports = app;