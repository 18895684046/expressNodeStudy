var express = require('express');
var router = express.Router();
const userControll = require('../controller/userControll')
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

/* 获取人员 */
router.get('/users', userControll.getUsers);

/* 添加人员 */
router.post('/users', upload.single('avatar'), userControll.addUsers)

// 更新人员
router.put('/users/:id', userControll.updateUser)

// 删除人员
router.delete('/users/:id', userControll.deleteUser)

// 登录
router.post('/login', userControll.loginFunc)

// 退出登录
router.post('/logout', userControll.logoutFunc)


module.exports = router;
