const jwt = require('jsonwebtoken')
const secret = 'zz-anydata'
/**
 * value 加密数据
 * secret 密钥
 * expires 过期时间
 */

const JWT = {
    generate(value, expires) {
        return jwt.sign(value, secret, { expiresIn: expires })
    },
    verify(token) {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            return false
        }
    }
}

module.exports = JWT