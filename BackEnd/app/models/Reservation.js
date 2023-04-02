const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reserSchema = new Schema({
    dateBooking: String,
    timeBooking: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    note: {
        type: String
    },
    seat: {
        type: Number
    },
    acepted: {
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    table: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Table'
        }
    ],
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }]
})

const Reservation = mongoose.model('Reservation', reserSchema);
module.exports = Reservation;