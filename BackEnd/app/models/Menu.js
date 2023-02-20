const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    note: {
        type: String,
    },
    food: [
        {
            type: Schema.Types.ObjectId,
            ref: 'food'
        }
    ]
})

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;