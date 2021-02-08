const { Router } = require('express')
const { onPostRefresh } = require('../controllers/refresh_controller')
const router = Router()

router.post('/refresh', onPostRefresh)

module.exports = router
