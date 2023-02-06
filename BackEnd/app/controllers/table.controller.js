const Table = require('../models/Table');
const User = require('../models/User');


exports.bookingTable = async (req, res, next) => {
    try {
        const table = new Table(req.body);
        const user = await User.findOne({ _id: req.body.user });
        if (user) {
            user.tables.push(table._id);
            await user.save();
        } else {
            throw new Error("User not found");
        }
        await table.save();
        return res.status(201).json({ table: table });
    } catch (err) {
        return res.status(406).json({ err: err });
    }
}

exports.getAllTable = async (req, res, next) => {
    const tables = await Table.find({});
    return res.status(200).json({ tables: tables });
}