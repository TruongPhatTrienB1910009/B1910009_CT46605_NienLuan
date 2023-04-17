const Table = require('../models/Table');
const User = require('../models/User');

exports.getAllTable = async (req, res, next) => {
    const tables = await Table.find({}).populate('reservations');
    return res.status(200).json({ tables });
}

exports.createTable = async (req, res, next) => {
    const table = new Table(req.body);
    await table.save();
    return res.status(200).json({ table: table });
}

exports.getTableById = async (req, res, next) => {
    const table = await Table.findById(req.params.id);
    return res.status(200).json(table);
}

exports.deleteTable = async (req, res, next) => {
    try {
        await Table.deleteOne({ _id: req.params.id })
        return res.status(200).json({ message: 'Deleted' });
    } catch (error) {
        console.log(error);
    }
}

exports.updateTable = async (req, res, next) => {
    try {
        const doc = await Table.findOneAndUpdate({ _id: req.params.id }, req.body);
        console.log(doc);
        return res.status(200).json({ "message": "success" });
    } catch (error) {
        console.log(error);
    }
}