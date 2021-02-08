const { Router } = require('express')
const { onGetUser } = require('../controllers/user_controller')
const router = Router()

router.get('/user', onGetUser)

module.exports = router
