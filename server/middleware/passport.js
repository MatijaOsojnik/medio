const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const {
    User,
    Role
} = require('../models')
const {
    Op
} = require("sequelize");

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

passport.use(new FacebookStrategy({
        clientID: config.authentication.facebookApiKey,
        clientSecret: config.authentication.facebookApiSecret,
        callbackURL: config.authentication.facebookCallbackURL,
        profileFields: ['id', 'displayName', 'photos', 'emails']
    },
  function (accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      console.log
      return cb(null, profile);
  }
));

module.exports = null