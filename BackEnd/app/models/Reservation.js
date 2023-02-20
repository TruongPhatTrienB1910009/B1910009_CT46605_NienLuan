const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reserSchema = new Schema({
    dateBooking: {
        type: Date
    },
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    table: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Table'
        }
    ],
    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }]
})

const Reservation = mongoose.model('Reservation', reserSchema);
module.exports = Reservation;