'use strict';

require('dotenv').config();
const { app } = require('./server');
const { db } = require('./src/models');
const PORT = process.env.PORT || 3002;

db.sync()
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.error(err.message));

app.listen(PORT, () => {
  console.log(`Server started. Listening on port ${PORT}`);
});