const { Router } = require('express');
const { onPostRefresh } = require('../controllers/refresh_controller');
const isAuth = require('../middlewares/isAuth');
const router = Router();

router.post('/refresh', isAuth, onPostRefresh);

module.exports = router;
