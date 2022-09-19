var path = require('path');
const userService = require('../services/userService')

const userControll = {
    // 获取人员列表
    async getUsers(req, res, next) {
        const data = await userService.getUsers()
        res.send(data)
    },
    // 添加用户
    async addUsers(req, res, next) {
        let avatar = req.file ? `/uploads/${req.file.filename}` : '/images/default.png'
        avatar = 'http://127.0.0.1:3008' + avatar

        const { username, password, age } = req.body
        const data = await userService.addUsers(username, password, age, avatar)
        if (data) {
            res.send({
                info: '插入数据成功！'
            })
        } else {
            res.send({
                info: '插入数据失败！'
            })
        }
    },
    // 更新用户信息
    async updateUser(req, res, next) {
        const { id } = req.params
        const data = await userService.updateUser(id)
        if (data) {
            res.send({
                info: '更新数据成功！'
            })
        } else {
            res.send({
                info: '更新数据失败！'
            })
        }
    },
    // 删除用户
    async deleteUser(req, res, next) {
        const { id } = req.params
        const data = await userService.deleteUser(id)
        if (data) {
            res.send({
                info: `${id}删除数据成功！`
            })
        } else {
            res.send({
                info: `${id}删除数据失败！`
            })
        }

    },
    // 登录
    async loginFunc(req, res, next) {
        const { username, password } = req.body
        const data = await userService.loginFunc(username, password)
        if (data.length == 0) {
            res.send({ success: false })
        } else {
            // 登录成功设置 session
            req.session.user = data[0] // 设置 session 对象
            // 默认存在 内存中 重启后会重置 -- 失效
            res.send({ success: true })
        }
    },
    // 退出登录
    logoutFunc(req, res, next) {
        req.session.destroy(() => {
            res.send({ success: true })
        })
    }
}

module.exports = userControll