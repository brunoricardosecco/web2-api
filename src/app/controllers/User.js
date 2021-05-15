const { User } = require('../models');
const { encryptPassword } = require('../helpers');

class UserController {
  async create(request, response) {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const { name, nickname, email, password, passwordConfirmation } =
        request.body;

      if (password !== passwordConfirmation) {
        return response
          .status(400)
          .json({ message: 'Invalid param passwordConfirmation' });
      }

      const user = await User.create({
        name,
        nickname,
        email,
        password,
      });

      return response.status(201).json({ user });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
