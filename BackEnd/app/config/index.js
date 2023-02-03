const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: 'mongodb://localhost:27017/bookingtables'
    },
    JWT: {
        maxAge: 2 * 24 * 60 * 60,
        key: 'bookingtables'
    }
}

module.exports = config;