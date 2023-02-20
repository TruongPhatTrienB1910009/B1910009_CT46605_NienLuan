const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    name: {
        type: String,
    },
    seat: {
        type: Number,
        required: true
    },
    location: {
        left: Number,
        top: Number
    },
    place: {
        type: String
    },
    reservations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reservation'
        }
    ]
})

const Table = mongoose.model('Table', tableSchema)
module.exports = Table;