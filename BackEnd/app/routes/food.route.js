const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.route('/')
    .get(foodController.getAllFoods)
    .post(foodController.newFood)

router.route('/:id')
    .get(foodController.getFoodByID)
    .put(foodController.updateFood)
    .delete(foodController.deleteFood)

module.exports = router;