const { Router } = require('express')
const { onGetUser } = require('../controllers/user_controller')
const checkAccessToken = require('../middlewares/checkAccessToken')
const router = Router()

router.get('/user/:id', checkAccessToken, onGetUser)

module.exports = router
