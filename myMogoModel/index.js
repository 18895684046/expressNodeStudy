const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userType = {
    username: String,
    password: String,
    age: Number,
    avatar: String
}
const userModel = mongoose.model('user', new Schema(userType))

module.exports = userModel