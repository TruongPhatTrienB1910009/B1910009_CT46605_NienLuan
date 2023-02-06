const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'guest'
    },
    tables: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Table'
        }
    ]
})

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;