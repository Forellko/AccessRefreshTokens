const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
  const token = Object.values(req.body)[0];

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(401).json(err);
        case 'JsonWebTokenError':
          return res.status(403).json(err);
      }
    } else {
      req.body = {
        ...req.body,
        id: decoded.id,
      };
      next();
    }
  });
};

module.exports = checkToken;
