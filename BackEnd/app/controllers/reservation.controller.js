const Reservation = require('../models/Reservation');

exports.createReser = async (req, res, next) => {
    const data = req.body;
    const reservation = new Reservation(data);
    await reservation.save();
    return res.status(200).json({ reservation });
}