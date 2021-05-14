const routes = require('express').Router();

routes.use('/', (_, res) => {
  res.status(200).json({ message: 'Working on!' });
});

module.exports = routes;
