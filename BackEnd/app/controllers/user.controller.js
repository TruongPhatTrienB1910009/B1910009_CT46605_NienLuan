const User = require('../models/User');
const Table = require('../models/Table');

const config = require('../config/index');
const JWT = require('jsonwebtoken');

const encodedToken = (userId) => {
    return JWT.sign({
        iss: 'B1910009',
        sub: userId,
        iat: new Date().getTime()
    }, config.JWT.key, { expiresIn: config.JWT.maxAge })
}

exports.register = async (req, res, next) => {

    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
        return res.status(403).json({ sucess: false });
    }

    const user = new User(req.body);
    await user.save();

    const token = encodedToken(user._id);
    res.header('jwt', token);
    return res.status(200).json({ user: user, token: token });
}

exports.signIn = async (req, res, next) => {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
        return res.status(403).json({ sucess: false });
    } else {
        if (foundUser.password === req.body.password) {
            const token = encodedToken(foundUser._id);
            res.header('jwt', token);
            return res.status(200).json({ token: token });
        }
    }

}

exports.logOut = (req, res, next) => {
    res.header('jwt', '', { maxAge: 1 })
}

exports.getAllTablesUser = async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId }).populate('tables');
    let document = user.tables;
    return res.status(200).json({ document });
}