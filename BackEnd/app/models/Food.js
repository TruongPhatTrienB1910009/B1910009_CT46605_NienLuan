const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    type: String
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;