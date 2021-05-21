const routes = require('express').Router();
const multer = require('multer');

const UserController = require('../app/controllers/UserController');
const CharacterController = require('../app/controllers/CharacterController');

const authMiddleware = require('../app/middlewares/auth');
const cache = require('../config/redis');

const upload = multer({
  storage: multer.diskStorage({
    destination(_, __, cb) {
      cb(null, './public/uploads');
    },
    filename(_, file, cb) {
      cb(null, `${new Date().valueOf()}_${file.originalname}`);
    },
  }),
});

routes.post('/user', cache.invalidate(), UserController.store);
routes.post('/authenticate', UserController.authenticate);
routes.get(
  '/public/uploads/:filename',
  cache.route(),
  CharacterController.showCharacterPhoto,
);

routes.use(authMiddleware);

routes.get('/user', cache.route(), UserController.findUser);

routes.post(
  '/character',
  cache.invalidate('/character?name='),
  upload.single('image'),
  CharacterController.store,
);
routes.get('/character', cache.route(), CharacterController.index);

module.exports = routes;
