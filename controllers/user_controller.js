const { User } = require('../models');

const onGetUser = async (req, res) => {
  const currentUser = await User.findOne({
    where: {
      id: req.id,
    },
  });

  const foundedUser = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  delete foundedUser.dataValues.password;
  delete foundedUser.dataValues.refreshToken;
  delete currentUser.dataValues.password;
  delete currentUser.dataValues.refreshToken;

  res.status(200).json({ foundedUser, currentUser });
};

module.exports = { onGetUser };
