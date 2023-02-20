const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.route('/')
    .post(reservationController.createReser)


module.exports = router;