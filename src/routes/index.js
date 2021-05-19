const routes = require('express').Router();
const multer = require('multer');

const UserController = require('../app/controllers/UserController');
const CharacterController = require('../app/controllers/CharacterController');

const authMiddleware = require('../app/middlewares/auth');

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

routes.post('/user', UserController.store);
routes.post('/authenticate', UserController.authenticate);
routes.get('/public/uploads/:filename', CharacterController.showCharacterPhoto);

routes.use(authMiddleware);

routes.post('/character', upload.single('image'), CharacterController.store);

module.exports = routes;
