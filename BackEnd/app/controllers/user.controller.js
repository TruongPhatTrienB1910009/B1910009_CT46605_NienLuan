const User = require('../models/User');

const config = require('../config/index');
const JWT = require('jsonwebtoken');

const encodedToken = (userId) => {
    return JWT.sign({
        iss: 'B1910009',
        sub: userId,
        iat: new Date.getTime()
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
    res.cookie('jwt', token, { httpOnly: true, maxAge: config.JWT.maxAge * 1000 });
    return res.status(200).json({ user });
}