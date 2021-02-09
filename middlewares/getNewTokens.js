const { User } = require('../models');
const jwt = require('jsonwebtoken');

// support func
const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: +process.env.ACCESS_TIME,
  });
  const refreshToken = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: +process.env.REFRESH_TIME,
  });

  User.update(
    { refreshToken: refreshToken },
    {
      where: {
        id: id,
      },
    }
  );
  return { accessToken, refreshToken };
};

// main func
const getNewTokens = async (req, res, next) => {
  const { username, id } = req.body;

  if (username) {
    const currentUser = await User.findOne({
      where: {
        username: username,
      },
    });
    req.body = generateTokens(currentUser.id);
    return next();
  }

  if (id) {
    req.body = generateTokens(id);
    return next();
  }
};

module.exports = getNewTokens;
