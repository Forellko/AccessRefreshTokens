const { User } = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

const onPostLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { dataValues: foundedUser } = await User.findOne({
      where: {
        username: username,
      },
    });
    console.log(foundedUser);

    if (!foundedUser) {
      return res.status(404).send('User not found');
    }

    const result = await bcrypt.compare(password, foundedUser.password);

    if (result) {
      const accessToken = await generateToken(foundedUser.id);
      const refreshToken = await generateToken(foundedUser.id, true);

      User.update(
        { refreshToken: refreshToken },
        {
          where: {
            id: foundedUser.id,
          },
        }
      );
      return res.status(200).json({ accessToken, refreshToken });
    } else {
      return res.status(401).send('Wrong username or password');
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

module.exports = { onPostLogin };
