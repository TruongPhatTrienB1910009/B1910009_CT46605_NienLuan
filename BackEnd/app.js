const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const userRoute = require('./app/routes/user.route')


// middleware
mongoose.set('strictQuery', false);
const ApiError = require('./app/api-error')
app.use(express.json());
app.use(cors());

// routes

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" })
})

app.use("/user", userRoute);

// handle 404 response

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
})

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    })
});

module.exports = app;