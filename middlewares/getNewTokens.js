const { User } = require('../models')
const jwt = require('jsonwebtoken')

const getNewTokens = async (req, res, next) => {
  const { username, password } = req.body

  const currentUser = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  })

  const { id } = currentUser

  const accessToken = jwt.sign({ id }, 'fusionA', {
    expiresIn: 30,
  })
  const refreshToken = jwt.sign({ id }, 'fusionR', {
    expiresIn: 60,
  })

  await User.update(
    { accessToken: accessToken, refreshToken: refreshToken },
    {
      where: {
        username: username,
      },
    }
  )

  res.status(200).json({
    accessToken,
    refreshToken,
  })

  next()
}

module.exports = getNewTokens
