const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller')


router.route("/")
    .get(tableController.getAllTable)
    .post(tableController.createTable)
    .put(tableController.bookingTable)


module.exports = router;