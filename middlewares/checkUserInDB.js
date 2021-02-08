const { User } = require('../models')
const CryptoJS = require('crypto-js')

const checkUserInDB = async (req, res, next) => {
  const { username, password } = req.body

  const currentUser = await User.findOne({
    where: {
      username: username,
    },
  })

  // console.log(CryptoJS.AES.encrypt(password, 'Fusion').toString())
  const bytes = CryptoJS.AES.decrypt(currentUser.dataValues.password, 'Fusion')

  const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

  if (password === originalPassword) {
    console.log('Success')
    next()
  } else {
    console.log('User not found')
  }
}

module.exports = checkUserInDB
