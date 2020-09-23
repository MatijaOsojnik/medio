require('dotenv').config()

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'medio',
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
        facebookApiKey: '629495027765739',
        facebookApiSecret: 'a8c1e1afe358f74845b1e3033ecf0b87',
        facebookCallbackURL: 'http://localhost:8082/api/auth/facebook/callback',
    }
}