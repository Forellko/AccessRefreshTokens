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
    res.status(200).send('Welcome')
    next()
  } else {
    res.status(401).send('User not found')
  }
}

module.exports = checkUserInDB
