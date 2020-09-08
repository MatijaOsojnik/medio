const passport = require('passport')
const {
    User
} = require('../models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('../config')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            if (user) {
                return done(null, user)
            } else{
                return done(null, false)
            }
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

module.exports = null