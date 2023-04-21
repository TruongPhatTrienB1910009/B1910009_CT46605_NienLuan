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
    reservation.user = data.userID;
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
    console.log(req.params.userID)
    const reservations = await Reservation.find({ user: req.params.userID }).populate('table').populate('user').populate('foods');
    console.log(reservations)
    return res.send(reservations);
}

exports.addFood = async (req, res, next) => {
    try {
        const foodID = req.body.foodID;
        const reser = await Reservation.findById(req.params.reserID);
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
    } catch (error) {
        console.log(error)
    }
}

exports.getByID = async (req, res, next) => {
    const reserID = req.params.reserID;
    console.log(reserID);
    const resers = await Reservation.findById(reserID).populate('foods');
    console.log(resers);
    return res.send(resers);
}

exports.getAll = async (req, res, next) => {
    const resers = await Reservation.find({}).populate('user').populate('foods').populate('table');
    return res.send(resers);
}

exports.deleteReser = async (req, res, next) => {
    try {
        const reser = await Reservation.findOne({ _id: req.params.reserID });
        const userID = reser.user;
        const tableID = reser.table[0];
        const table = await Table.findOne({ _id: tableID });
        const user = await User.findOne({ _id: userID });
        table.reservations.filter((reser) => {
            return reser !== req.params.reserID;
        })
        user.reservations.filter((user) => {
            return user !== userID;
        })
        await user.save();
        await table.save();
        await Reservation.deleteOne({ _id: req.params.reserID });
        return res.send("success");
    } catch (error) {
        res.send(error.message);
    }
}

exports.aceptReser = async (req, res) => {
    try {
        const reser = await Reservation.findById(req.params.reserID);
        reser.acepted = true;
        await reser.save();
    } catch (err) {
        console.error(err.message);
    }
}