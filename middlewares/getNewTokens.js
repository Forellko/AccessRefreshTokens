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
  const { username, refreshToken } = req.body;

  if (refreshToken) {
    jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            return res.status(401).json(err);
          case 'JsonWebTokenError':
            return res.status(403).json(err);
        }
      } else {
        req.body = generateTokens(decoded.id);
        next();
      }
    });
  } else {
    const currentUser = await User.findOne({
      where: {
        username: username,
      },
    });
    req.body = generateTokens(currentUser.id);
    next();
  }
};

module.exports = getNewTokens;
