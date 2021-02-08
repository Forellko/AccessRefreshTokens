const { User } = require('../models')
const jwt = require('jsonwebtoken')

const getNewTokens = async (req, res, next) => {
  const { username } = req.body

  const accessToken = jwt.sign({ username }, 'fusionA')
  const refreshToken = jwt.sign({ username }, 'fusionR')

  await User.update(
    { accessToken: accessToken, refreshToken: refreshToken },
    {
      where: {
        username: username,
      },
    }
  )

  res.status(200).json({ accessToken, refreshToken })

  next()
}

module.exports = getNewTokens
