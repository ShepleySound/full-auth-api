'use strict';

// 3rd party middleware
const express = require('express');
const cors = require('cors');

// Custom middleware
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger.js');

// Require routes here?
console.log('MAKE SURE YOU REQUIRE YOUR ROUTES');

const app = express();

// App level middleware
app.use(cors());
app.use(logger);

// Accept json or form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Catch-all route (404)
app.use('*', notFound);

// Default error handler (500)
app.use(errorHandler);
