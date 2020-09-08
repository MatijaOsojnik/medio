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
                            user.setRoles(roles).then(() => {
                                res.send({
                                    message: "User was registered successfully!"
                                });
                            });
                        });
                    } else {
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
    }
}