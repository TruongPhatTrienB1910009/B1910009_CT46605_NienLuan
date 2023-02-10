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

    console.log(req.body);
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
        return res.status(403).json({ message: "Email này đã được đăng ký." });
    }

    if (req.body.password !== req.body.confirm) {
        return res.status(403).json({ message: "Mật khẩu không trùng khớp." });
    }

    const user = new User({ email: req.body.email, password: req.body.password });
    await user.save();

    const token = encodedToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: config.JWT.maxAge * 1000 });
    return res.status(200).json({ token: token });
}

exports.signIn = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.status(403).send({ message: 'User not found' });
        } else {
            if (foundUser.password === req.body.password) {
                const token = encodedToken(foundUser._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: config.JWT.maxAge * 1000 });
                return res.send(token);
            }
        }
    } catch (e) {
        console.error(e);
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