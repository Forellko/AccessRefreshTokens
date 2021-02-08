const { Router } = require('express')
const { onPostRefresh } = require('../controllers/refresh_controller')
const checkRefreshToken = require('../middlewares/checkRefreshToken')
const router = Router()

router.post('/refresh', checkRefreshToken, onPostRefresh)

module.exports = router
