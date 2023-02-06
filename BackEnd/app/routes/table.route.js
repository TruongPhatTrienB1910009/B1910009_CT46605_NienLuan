const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller')


router.route("/")
    .get(tableController.getAllTable)
    .post(tableController.bookingTable)


module.exports = router;