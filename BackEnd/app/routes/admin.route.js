const express = require('express');
const Router = express.Router();
const adminController = require('../controllers/admin.controller')

Router.route('/')
    .get(adminController.statisticalRecent)


module.exports = Router;