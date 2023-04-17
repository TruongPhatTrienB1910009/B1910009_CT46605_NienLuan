const Food = require('../models/Food');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: '../Frontend/src/assets/images/foods',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage
}).single('image')

exports.newFood = (req, res, next) => {
    upload(req, res, async (error) => {
        if (error) {
            console.error(error.message);
        } else {
            try {
                console.log(req.file);
                const food = new Food({
                    name: req.body.name,
                    price: req.body.price,
                    type: req.body.type,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                });
                await food.save();
                return res.send(food);
            } catch (error) {
                return res.send(error.message);
            }
        }
    })
}

exports.getAllFoods = async (req, res, next) => {
    const foods = await Food.find({});
    return res.status(200).json(foods);
}

exports.getFoodByID = async (req, res, next) => {
    try {
        const food = await Food.findById(req.params.id);
        return res.send(food);
    } catch (error) {
        console.error(error.message);
    }
}


exports.deleteFood = async (req, res, next) => {
    try {
        await Food.deleteOne({ _id: req.params.id });
        return res.send("deleted");
    } catch (error) {
        console.error(error.message);
    }
}

exports.updateFood = async (req, res, next) => {
    upload(req, res, async (error) => {
        if (error) {
            console.error(error.message);
        } else {
            try {
                console.log(req.params.id);
                console.log(req.body);
                console.log(req.file);
                const food = {
                    name: req.body.name,
                    price: req.body.price,
                    type: req.body.type,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                };
                console.log(req.params.id)
                const doc = await Food.findOneAndUpdate({ _id: req.params.id }, food)

                return res.send(doc);
            } catch (error) {
                console.error(error.message);
            }
        }
    })
}