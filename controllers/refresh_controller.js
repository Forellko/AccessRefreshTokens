const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const util = require('util');

const verify = util.promisify(jwt.verify).bind(jwt);

const onPostRefresh = async (req, res) => {
  /// Добавить проверку в бд рефреш

  try {
    const { id } = await verify(req.body.refreshToken, process.env.SECRET);

    const foundedUser = await User.findOne({
      where: {
        id,
      },
    });

    if (foundedUser.refreshToken !== req.body.refreshToken) {
      return res.status(401).send('Access rejected');
    }

    const accessToken = await generateToken(id);
    const refreshToken = await generateToken(id, true);

    User.update(
      { refreshToken },
      {
        where: {
          id: foundedUser.id,
        },
      }
    );

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err.message);
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json(err);
      case 'JsonWebTokenError':
        return res.status(403).json(err);
      default:
        return res.status(400).json(err);
    }
  }
};

module.exports = { onPostRefresh };
