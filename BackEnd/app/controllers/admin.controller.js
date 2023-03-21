const Reservation = require('../models/Reservation');
const Table = require('../models/Table');
const moment = require('moment');
exports.statisticalRecent = async (req, res, next) => {
    const filter = {
        data: [],
        categories: [],
        times: []
    }
    const reservations = await Reservation.find({});
    for (let i = 6; i >= 0; i--) {
        filter.categories.push(moment().subtract(i, 'days').format().slice(0, 10));
    }

    filter.categories.forEach((day) => {
        let count = 0;
        reservations.forEach(reservation => {
            if (reservation.dateBooking == day) {
                count++;
            }
        })
        filter.data.push(count);
    })

    const tables = await Table.find({}).populate("reservations");

    tables.forEach(table => {
        let count = 0;
        table.reservations.forEach(reservation => {
            for (let i = 6; i >= 0; i--) {
                if (reservation.dateBooking == moment().subtract(i, 'days').format().slice(0, 10)) {
                    count++;
                }
            }
        })
        filter.times.push(count);
    })


    return res.send(filter);
}