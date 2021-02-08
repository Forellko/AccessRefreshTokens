const { User } = require('../models')
const jwt = require('jsonwebtoken')

const checkAccessToken = async (req, res, next) => {
  const { accessToken } = req.body

  const currentUser = await User.findOne({
    where: {
      id: req.params.id,
    },
  })

  try {
    jwt.verify(accessToken, 'fusionA', () => {})
    res.status(200).json(currentUser.dataValues)
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).send('Access Failed')
  }
}

module.exports = checkAccessToken
