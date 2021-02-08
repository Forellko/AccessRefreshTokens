const { User } = require('../models')

const checkUserInDB = async (req, res, next) => {
  const { username, password } = req.body

  const isUserExist = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  })

  if (isUserExist) {
    res.status(200).json(isUserExist.dataValues.username)
    next()
  } else {
    res.status(401).json({ username: username })
  }
}

module.exports = checkUserInDB
