const JWT = require('jsonwebtoken')
const User = require('../models/User')

const config = require('../config/index')
const ApiError = require('../api-error')

const requireAuth = function (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        JWT.verify(token, config.JWT.key, (err, decodedToken) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        throw new Error("token not found");
    }
}

module.exports = { requireAuth }