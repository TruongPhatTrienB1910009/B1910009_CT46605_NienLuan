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

exports.getAllReservationsByUserID = async (req, res, next) => {
    const reservations = await Reservation.find({ userID: req.params.userID }).populate('table').populate('user').populate('foods');
    console.log(reservations);
    return res.send(reservations);
}

exports.addFood = async (req, res, next) => {
    const foodID = req.body.foodID;
    const reser = await Reservation.findById(req.body.reserID);
    const action = req.body.action;
    let newfoods = [];

    if (action === 'add') {
        reser.foods.push(foodID);
        reser.save();
    } else {
        newfoods = reser.foods.filter((food) => {
            return food != foodID;
        })
        reser.foods = newfoods;
        reser.save();
    }
    return res.send(reser);
}

exports.getByID = async (req, res, next) => {
    const reserID = req.params.reserID;
    console.log(reserID);
    const resers = await Reservation.findById(reserID).populate('foods');
    console.log(resers);
    return res.send(resers);
}