const routerLogin = require('./login_router');
const routerRefresh = require('./refresh_router');
const routerUser = require('./user_router');
const { Router } = require('express');

const router = Router();

router.use('/', routerLogin);
router.use('/', routerRefresh);
router.use('/', routerUser);

module.exports = router;
