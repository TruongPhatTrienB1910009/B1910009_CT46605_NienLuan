const Food = require('../models/Food');

exports.newFood = async (req, res, next) => {
    const food = new Food(req.body);
    await food.save();
    res.send(food);
}

exports.getAllFoods = async (req, res, next) => {
    const foods = await Food.find({});
    return res.status(200).json(foods);
}