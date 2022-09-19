const userModel = require('../myMogoModel/index')

const userService = {
    getUsers() {
        // .skip().limit(2)
        return userModel.find({}, ['username', 'age','avatar']).sort({ age: -1 })
    },
    addUsers(username, password, age, avatar) {
        return userModel.create({ username, password, age, avatar })
    },
    updateUser(id) {
        return userModel.updateOne(
            { _id: id },
            { username: "11更新的名字", password: "11更新后的密码" })
    },
    deleteUser(id) {
        return userModel.deleteOne({ _id: id })
    },
    loginFunc(username, password) {
        return userModel.find({ username, password })
    }
}

module.exports = userService