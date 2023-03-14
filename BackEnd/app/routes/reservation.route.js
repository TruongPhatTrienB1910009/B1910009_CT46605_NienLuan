const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.route('/')
    .post(reservationController.createReser)

router.route('/:reserID')
    .get(reservationController.getByID)

router.route('/food/')
    .put(reservationController.addFood)

router.route('/user/:userId')
    .get(reservationController.getAllReservationsByUserID)

module.exports = router;