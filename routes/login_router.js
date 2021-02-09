const { Router } = require('express');
const { onPostLogin } = require('../controllers/login_controller');
const checkUserInDB = require('../middlewares/checkUserInDB');
const getNewTokens = require('../middlewares/getNewTokens');
const router = Router();

router.post('/login', checkUserInDB, getNewTokens, onPostLogin);

module.exports = router;
