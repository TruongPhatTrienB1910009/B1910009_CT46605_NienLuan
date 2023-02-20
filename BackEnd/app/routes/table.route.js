const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller')
const { requireAuth } = require('../middlewares/authMiddleware')


router.route("/")
    .get(tableController.getAllTable)
    .post(requireAuth, tableController.createTable)

router.route("/:id")
    .get(tableController.getTableById)
module.exports = router;