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