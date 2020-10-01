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
        // facebookApiKey: process.env.FACEBOOK_API_KEY,
        // facebookApiSecret: process.env.FACEBOOK_API_SECRET,
        // facebookCallbackURL: process.env.FACEBOOK_API_CALLBACK_URL,
        // googleApiKey: process.env.GOOGLE_API_KEY,
        // googleApiSecret: process.env.GOOGLE_API_SECRET,
        // googleCallbackURL: process.env.GOOGLE_API_CALLBACK_URL,
    }
}