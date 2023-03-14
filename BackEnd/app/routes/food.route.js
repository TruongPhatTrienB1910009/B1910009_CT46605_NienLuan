const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.route('/')
    .get(foodController.getAllFoods)
    .post(foodController.newFood)


module.exports = router;