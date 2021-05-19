const { Character, User } = require('../models');

class CharacterController {
  async store(request, response) {
    try {
      const { isAdmin } = request;

      if (!isAdmin) {
        return response
          .status(404)
          .json({ message: 'only admin users can post a new character' });
      }

      const requiredFields = ['userId', 'name', 'nickname'];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      if (!request.file) {
        return response.status(400).json({ message: 'Missing param image' });
      }

      const { userId, name, nickname } = request.body;
      const { file } = request;

      const existsUser = await User.findByPk(userId);

      if (!existsUser) {
        return response.status(400).json({ message: 'Invalid userId' });
      }

      const character = await Character.create({
        user_id: userId,
        name,
        nickname,
        photo: file.filename,
      });

      return response.status(201).json({ character });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new CharacterController();
