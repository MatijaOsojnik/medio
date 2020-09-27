const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const {
    User,
} = require('../models')

const jwt = require('jsonwebtoken');

function jwtSignUser(user) {
    return jwt.sign({
        user,
    }, config.authentication.jwtSecret, {
        expiresIn: 86400
    })
}

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('../config');

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
            } else {
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
    async function (accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        const {
            id,
            name,
            picture,
            email
        } = profile._json

        let user = await User.findOne({
            where: {
                facebook_id: id,
                email: email
            }
        })

        if (!user) {
            user = await User.create({
                display_name: name,
                email: email,
                icon_url: picture.data.url,
                facebook_id: id
            })
        }
        return cb(null, user);

    }
));

passport.serializeUser(function (user, cb) {
    //         let newUser;
    // user.setRoles([1]).then(async () => {

    //     const authorities = []

    //     let userJson;

    //     await user.getRoles().then(roles => {
    //         for (let i = 0; i < roles.length; i++) {
    //             authorities.push("ROLE_" + roles[i].name.toUpperCase());
    //         }
    //         userJson = user.toJSON();

    //         newUser = {
    //             authorities: authorities,
    //             user: user,
    //             token: jwtSignUser(userJson)
    //         }
               
    //     })
    // }).catch((req, res, err) => {
    //     res.status(500).send({
    //         error: err
    //     })
    // })
 cb(null, user)
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = null