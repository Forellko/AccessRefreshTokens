const { User } = require('../models')
const jwt = require('jsonwebtoken')

const checkRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body

  try {
    const result = await jwt.verify(refreshToken, 'fusionR')
    const newAccessToken = await jwt.sign({ id: result.id }, 'fusionA', {
      expiresIn: 30,
    })
    const newRefreshToken = await jwt.sign({ id: result.id }, 'fusionR', {
      expiresIn: 60,
    })
    res.status(200).json({ newAccessToken, newRefreshToken })
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).send('Refresh Failed')
  }
}

module.exports = checkRefreshToken
