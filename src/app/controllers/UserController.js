const { User } = require('../models');
const { encryptPassword } = require('../helpers');

class UserController {
  async store(request, response) {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
        'isAdmin',
      ];

      for (const field of requiredFields) {
        if (field === 'isAdmin') return false;

        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const {
        name,
        nickname,
        email,
        password,
        passwordConfirmation,
        isAdmin = false,
      } = request.body;

      if (password !== passwordConfirmation) {
        return response
          .status(400)
          .json({ message: 'Invalid param passwordConfirmation' });
      }

      const existsUser = await User.findOne({
        where: {
          email,
        },
      });

      if (existsUser) {
        return response
          .status(400)
          .json({ message: 'This email already have an account' });
      }

      const hashedPassword = await encryptPassword(password);

      const user = await User.create({
        name,
        nickname,
        email,
        password: hashedPassword,
        is_admin: isAdmin,
      });

      return response.status(201).json({ user });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async authenticate(request, response) {
    try {
      const requiredFields = ['email', 'password'];

      requiredFields.some((field) => {
        if (field === 'isAdmin') return false;

        if (!request.body[field]) {
          response.status(400).json({ message: `Missing param ${field}` });
          return true;
        }
        return false;
      });

      const { email, password } = request.body;

      const existsUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!existsUser) {
        response.status(400).json({ message: 'Invalid email or password' });
      }

      const isValidPassword = await existsUser.checkPassword(password);

      if (!isValidPassword) {
        response.status(400).json({ message: 'Invalid email or password' });
      }

      const access_token = existsUser.generateToken();

      return response.status(200).json({ user: existsUser, access_token });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
