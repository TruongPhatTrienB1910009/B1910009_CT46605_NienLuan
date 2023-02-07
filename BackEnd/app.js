const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const { requireAuth, checkUser } = require('./app/middlewares/authMiddleware')

const userRoute = require('./app/routes/user.route')
const tableRoute = require('./app/routes/table.route')



// middleware
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false);
const ApiError = require('./app/api-error')


// routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" })
})

app.use("/api/myapp/user", userRoute);
app.use("/api/myapp/table", requireAuth, tableRoute);

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