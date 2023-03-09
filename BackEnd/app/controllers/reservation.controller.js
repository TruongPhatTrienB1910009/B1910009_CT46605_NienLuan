const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Table = require('../models/Table');
exports.createReser = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    const reservation = new Reservation({
        dateBooking: data.dateBooking,
        timeBooking: data.timeBooking,
        name: data.name,
        phone: data.phone,
        note: data.note,
        seat: data.seat
    });
    reservation.table.push(data.tableID);
    reservation.user.push(data.userID);
    await reservation.save();

    const user = await User.findById(data.userID);
    user.reservations.push(reservation._id);
    await user.save();

    const table = await Table.findById(data.tableID);
    table.reservations.push(reservation._id);
    await table.save();

    return res.status(200).json({ reservation });
}