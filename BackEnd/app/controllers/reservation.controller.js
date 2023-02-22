const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Table = require('../models/Table');
exports.createReser = async (req, res, next) => {
    const data = req.body;
    const reservation = new Reservation({
        name: data.name,
        phone: data.phone,
        dateBooking: data.dateBooking,
        note: data.note
    });
    reservation.table.push(data.table);
    reservation.user.push(data.user);
    await reservation.save();

    const user = await User.findById(data.user);
    user.reservations.push(reservation._id);
    await user.save();

    const table = await Table.findById(data.table);
    table.reservations.push(reservation._id);
    await table.save();

    return res.status(200).json({ reservation });
}