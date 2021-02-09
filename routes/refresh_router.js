const { Router } = require('express');
const { onPostRefresh } = require('../controllers/refresh_controller');
const checkToken = require('../middlewares/checkToken');
const getNewTokens = require('../middlewares/getNewTokens');
const router = Router();

router.post('/refresh', checkToken, getNewTokens, onPostRefresh);

module.exports = router;
