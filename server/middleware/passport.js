const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {
    ExtractJwt
} = require('passport-jwt');
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {
    User,
} = require('../models')

// function jwtSignUser(user) {
//     return jwt.sign({
//         user,
//     }, config.authentication.jwtSecret, {
//         expiresIn: 86400
//     })
// }

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

passport.use(new GoogleStrategy({
        clientID: config.authentication.googleApiKey,
        clientSecret: config.authentication.googleApiSecret,
        callbackURL: config.authentication.googleCallbackURL,
        profileFields: ['id', 'displayName', 'photos', 'emails']
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const {
                sub,
                name,
                picture,
                email
            } = profile._json

            console.log('profile', profile);
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);

            let user = await User.findOne({
                where: {
                    email: email
                }
            })

            if(user) {
                await user.update({
                    google_id: sub
                })
            }


            if (!user) {
                user = await User.create({
                    display_name: name,
                    email: email,
                    icon_url: picture,
                    google_id: sub
                })
            }
            return cb(null, user)

        } catch (error) {
            return cb(error, false, error.message);
        }
    }
));

passport.use(new FacebookStrategy({
        clientID: config.authentication.facebookApiKey,
        clientSecret: config.authentication.facebookApiSecret,
        callbackURL: config.authentication.facebookCallbackURL,
        profileFields: ['id', 'displayName', 'photos', 'emails']
    },
    async (accessToken, refreshToken, profile, cb) => {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        try {
            const {
                id,
                name,
                picture,
                email
            } = profile._json

            console.log('profile', profile);
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);

            let user = await User.findOne({
                where: {
                    email: email
                }
            })

            if(user) {
                await user.update({
                    facebook_id: id
                })
            }


            if (!user) {
                user = await User.create({
                    display_name: name,
                    email: email,
                    icon_url: picture.data.url,
                    facebook_id: id
                })
            }
            return cb(null, user)

        } catch (error) {
            return cb(error, false, error.message);
        }

    }
));

// passport.serializeUser(function (user, cb) {
//     //         let newUser;
//     // user.setRoles([1]).then(async () => {

//     //     const authorities = []

//     //     let userJson;

//     //     await user.getRoles().then(roles => {
//     //         for (let i = 0; i < roles.length; i++) {
//     //             authorities.push("ROLE_" + roles[i].name.toUpperCase());
//     //         }
//     //         userJson = user.toJSON();

//     //         newUser = {
//     //             authorities: authorities,
//     //             user: user,
//     //             token: jwtSignUser(userJson)
//     //         }

//     //     })
//     // }).catch((req, res, err) => {
//     //     res.status(500).send({
//     //         error: err
//     //     })
//     // })
//  cb(null, user)
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

module.exports = null