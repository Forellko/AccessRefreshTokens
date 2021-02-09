const { User } = require('../models');
const CryptoJS = require('crypto-js');

const checkUserInDB = async (req, res, next) => {
  const { username, password } = req.body;

  const currentUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!currentUser) {
    return res.status(404).send('User not found');
  }

  // console.log(CryptoJS.AES.encrypt(password, process.env.SECRET).toString());
  const bytes = await CryptoJS.AES.decrypt(
    currentUser.dataValues.password,
    process.env.SECRET
  );

  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  if (password === originalPassword) {
    next();
  } else {
    res.status(401).send('Wrong username or password');
  }
};

module.exports = checkUserInDB;
