var express = require('express');
var router = express.Router();
const loginControll = require('../controller/loginControll')

/*  登录 */
router.get('/', loginControll.login);

module.exports = router;
