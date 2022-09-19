var express = require('express');
const JWT = require('../utils/jwt');
var router = express.Router();

/* 获取全部人员 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
