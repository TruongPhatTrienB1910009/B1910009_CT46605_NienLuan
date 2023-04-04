const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./app/middlewares/authMiddleware')

const userRoute = require('./app/routes/user.route')
const tableRoute = require('./app/routes/table.route')
const reservationRoute = require('./app/routes/reservation.route')
const foodRoute = require('./app/routes/food.route')
const adminRoute = require('./app/routes/admin.route')

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
mongoose.set('strictQuery', false);
const ApiError = require('./app/api-error')


// routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" })
})

app.use("/api/myapp/user", userRoute);
app.use("/api/myapp/table", tableRoute);
app.use("/api/myapp/reservation", requireAuth, reservationRoute);
app.use("/api/myapp/food", foodRoute);
app.use("/api/myapp/admin", requireAuth, adminRoute);

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