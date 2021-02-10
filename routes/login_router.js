const { Router } = require('express');
const { onPostLogin } = require('../controllers/login_controller');
const router = Router();

router.post('/login', onPostLogin);

module.exports = router;
