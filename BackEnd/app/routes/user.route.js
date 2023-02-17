const { Router } = require('express');
const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.route("/register")
    .post(userController.register)

router.route("/signin")
    .post(userController.signIn)

router.route("/logout")
    .post(userController.logOut)

router.route("/:id/info")
    .get(userController.getUser)


module.exports = router;