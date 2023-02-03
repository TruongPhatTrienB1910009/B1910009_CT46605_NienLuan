const app = require('./app')
const config = require('./app/config')
const mongoose = require('mongoose')

try {

    // connect to the database
    mongoose.connect(config.db.uri);
    console.log('Connect to database successfully');

    // start server
    const PORT = config.app.port;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
} catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
}