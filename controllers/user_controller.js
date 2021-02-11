const { User } = require('../models');

const onGetUser = async (req, res) => {
  try {
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

    return res.status(200).json({ foundedUser, currentUser });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

module.exports = { onGetUser };
