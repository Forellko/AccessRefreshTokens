const { Router } = require('express')
const { onPostLogin } = require('../controllers/login_controller')
const checkUserInDB = require('../middlewares/checkUserInDB')
const router = Router()

router.post('/login', checkUserInDB, onPostLogin)

module.exports = router
