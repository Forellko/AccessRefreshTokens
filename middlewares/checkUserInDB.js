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
    console.log('Success')
    next()
  } else {
    console.log('User not found')
  }
}

module.exports = checkUserInDB
