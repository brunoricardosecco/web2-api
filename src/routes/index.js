const routes = require('express').Router();

const UserController = require('../app/controllers/User');

routes.post('/user', UserController.create);

routes.use('/', (_, res) => {
  res.status(200).json({ message: 'Working on!' });
});

module.exports = routes;
