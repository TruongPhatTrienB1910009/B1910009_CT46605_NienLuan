const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.route('/')
    .get(reservationController.getAll)
    .post(reservationController.createReser)

router.route('/:reserID')
    .get(reservationController.getByID)
    .put(reservationController.aceptReser)
    .delete(reservationController.deleteReser)

router.route('/food/')
    .put(reservationController.addFood)

router.route('/user/:userID')
    .get(reservationController.getAllReservationsByUserID)

module.exports = router;