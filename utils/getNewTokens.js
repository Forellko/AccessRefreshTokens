const { User } = require('../models');
const jwt = require('jsonwebtoken');
const util = require('util');

// support func
const getNewTokens = (id) => {
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

module.exports = getNewTokens;
