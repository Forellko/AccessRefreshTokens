const { User } = require('../models');
const jwt = require('jsonwebtoken');
const e = require('express');

const checkAccessToken = async (req, res, next) => {
  const { accessToken } = req.body;

  jwt.verify(accessToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(401).json(err);
        case 'JsonWebTokenError':
          return res.status(403).json(err);
      }
    } else {
      const currentUser = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      req.body.user = currentUser;
      next();
    }
  });
};

module.exports = checkAccessToken;
