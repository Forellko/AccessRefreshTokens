const { User } = require('../models')
const jwt = require('jsonwebtoken')

const getNewTokens = async (req, res, next) => {
  const { username } = req.body

  const accessToken = jwt.sign({ username }, 'fusionA', { expiresIn: 30 })
  const refreshToken = jwt.sign({ username }, 'fusionR', { expiresIn: 60 })

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
