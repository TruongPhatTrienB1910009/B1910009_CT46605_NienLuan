const JWT = require('jsonwebtoken')
const User = require('../models/User')

const config = require('../config/index')
const ApiError = require('../api-error')

const requireAuth = function (req, res, next) {
    const token = req.headers.jwt;
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

const checkUser = function (req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (token) {
            JWT.verify(token, config.JWT.key, async (err, decodedToken) => {
                if (err) {
                    console.error(err.message);
                    res.locals.user = null;
                    next();
                } else {
                    console.log(decodedToken);
                    let user = await User.findById(decodedToken.userId);
                    res.locals.user = user;
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    } catch (e) {
        return next(new ApiError());
    }
}

module.exports = { requireAuth, checkUser }