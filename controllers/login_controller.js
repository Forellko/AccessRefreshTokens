const { User } = require('../models');
const bcrypt = require('bcrypt');
const getNewToken = require('../utils/getNewTokens');

const onPostLogin = async (req, res) => {
  const { username, password } = req.body;

  const currentUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!currentUser) {
    return res.status(404).send('User not found');
  }

  bcrypt.compare(password, currentUser.password, function (err, result) {
    result
      ? res.status(200).json(getNewToken(currentUser.id))
      : res.status(401).send('Wrong username or password');
  });
};

module.exports = { onPostLogin };
