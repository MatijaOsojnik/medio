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
        facebookApiKey: '233715621400416',
        facebookApiSecret: '9fb3e2da3243b0f48cf440c0421adfe4',
        facebookCallbackURL: 'http://localhost:8082/api/auth/facebook/callback',
    }
}