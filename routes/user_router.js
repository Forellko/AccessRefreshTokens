const { Router } = require('express');
const { onGetUser } = require('../controllers/user_controller');
const checkToken = require('../middlewares/checkToken');
const router = Router();

router.get('/user/:id', checkToken, onGetUser);

module.exports = router;
