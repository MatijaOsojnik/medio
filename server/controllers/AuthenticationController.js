const {
    User,
    Role,
} = require('../models');

const {
    Op
} = require("sequelize");

const jwt = require('jsonwebtoken');
const config = require('../config')

function jwtSignUser(user) {
    return jwt.sign({
        user,
    }, config.authentication.jwtSecret, {
        expiresIn: 86400
    })
}

module.exports = {
    async register(req, res) {
        try {
            await User.create({
                    display_name: req.body.display_name,
                    email: req.body.email,
                    password: req.body.password,
                    repeat_password: req.body.repeat_password
                })
                .then((user) => {
                    if (req.body.roles) {
                        Role.findAll({
                            where: {
                                name: {
                                    [Op.or]: req.body.roles
                                }
                            }
                        }).then(roles => {
                            user.setRoles(roles).then(async () => {
                                const authorities = []

                                const roles = await user.getRoles()
                                for (let i = 0; i < roles.length; i++) {
                                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                                }

                                const userJson = user.toJSON();
                                res.send({
                                    authorities: authorities,
                                    user: user,
                                    token: jwtSignUser(userJson)
                                })
                            });
                        });
                    } else {
                        user.setRoles([1]).then(async () => {
                            const authorities = []

                            const roles = await user.getRoles()
                            for (let i = 0; i < roles.length; i++) {
                                authorities.push("ROLE_" + roles[i].name.toUpperCase());
                            }

                            const userJson = user.toJSON();
                            res.send({
                                authorities: authorities,
                                user: user,
                                token: jwtSignUser(userJson)
                            })
                        }).catch(err => {
                            res.status(500).send({
                                error: err
                            })
                        })
                    }
                })
        } catch (err) {
            res.status(400).send([`Email is already in use.`])
        }
    },
    async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                where: {
                    email: email,
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: `The login information was incorrect`
                })
            }
            if (!(await user.comparePassword(password))) {
                return res.status(403).send({
                    error: `The login information was incorrect`
                })
            }

            const authorities = []

            const roles = await user.getRoles()
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }

            const userJson = user.toJSON();
            res.send({
                authorities: authorities,
                user: user,
                token: jwtSignUser(userJson)
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: `An error has occured trying to log in.`
            })
        }
    },
    async googleAuth(req, res) {
        const {
            LT,
            Ad,
            $J,
            Xt
        } = req.body

        let user = await User.findOne({
            where: {
                email: Xt
            }
        })

        if (user) {
            await user.update({
                google_id: LT
            })
        }

        if (!user) {
            user = await User.create({
                display_name: Ad,
                email: Xt,
                icon_url: $J,
                google_id: LT
            })
            user.setRoles([1]).then(() => {
                res.send({
                    message: "User was registered successfully!"
                });
            }).catch(err => {
                res.status(500).send({
                    error: err
                })
            })
        }
        const token = jwtSignUser(user.toJSON());
        // res.cookie('access_token', token, {
        //     httpOnly: true
        // });
        const authorities = []

        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).json({
            authorities: authorities,
            user: user,
            token: token
        })
    },
    async facebookAuth(req, res) {
        const user = req.user
        const token = jwtSignUser(req.user.toJSON());
        res.cookie('access_token', token, {
            httpOnly: true
        });
        const authorities = []

        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).json({
            authorities: authorities,
            user: user,
            token: token
        })
    },

}