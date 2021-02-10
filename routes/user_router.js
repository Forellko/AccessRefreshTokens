const { Router } = require('express');
const { onGetUser } = require('../controllers/user_controller');
const isAuth = require('../middlewares/isAuth');
const router = Router();

router.get('/user/:id', isAuth, onGetUser);

module.exports = router;
