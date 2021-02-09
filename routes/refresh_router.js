const { Router } = require('express');
const { onPostRefresh } = require('../controllers/refresh_controller');
const getNewTokens = require('../middlewares/getNewTokens');
const router = Router();

router.post('/refresh', getNewTokens, onPostRefresh);

module.exports = router;
