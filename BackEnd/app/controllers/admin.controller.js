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
    for (let i = 0; i <= moment().month(); i++) {
        if (i < 10) {
            filter.categories.push(`0${i + 1}`);
        } else {
            filter.categories.push(i + 1);
        }
    }

    filter.categories.forEach((month) => {
        let count = 0;
        reservations.forEach(reservation => {
            let date = reservation.dateBooking.slice(reservation.dateBooking.indexOf('-') + 1, reservation.dateBooking.lastIndexOf('-'));
            if (date == month) {
                count++;
            }
        })
        filter.data.push(count);
    })

    const tables = await Table.find({}).populate("reservations");

    tables.forEach(table => {
        filter.times.push(table.reservations.length);
    })


    return res.send(filter);
}