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
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    booked: false,
    user: {
        userID: String,
    },
    location: {
        left: Number,
        top: Number
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }
})

const Table = mongoose.model('Table', tableSchema)
module.exports = Table;