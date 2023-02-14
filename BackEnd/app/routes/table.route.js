const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller')
const { requireAuth } = require('../middlewares/authMiddleware')


router.route("/")
    .get(tableController.getAllTable)
    .post(requireAuth, tableController.createTable)
    .put(requireAuth, tableController.bookingTable)


module.exports = router;