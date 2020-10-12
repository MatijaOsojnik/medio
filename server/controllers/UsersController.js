const {
    User,
    Role,
    Story
} = require('../models')

const fs = require('fs')

const aws = require('aws-sdk')

const {
    Op
} = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll({})
            res.send(users)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch users`
            })
        }
    },
    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a user`
            })
        }
    },
    async allUserInfo(req, res) {
        try {
            const users = await User.findAll({
                include: [{
                    model: Role
                }]
            })
            res.send(users)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch users`
            })
        }
    },
    async put(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            if (user.email !== req.body.email) {
                if (req.body.roles) {
                    const roles = await Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    })
                    user.setRoles(roles)
                }
                await user.update(req.body, {
                        returning: true,
                        plain: true,
                    })
                    .then(() => res.send(req.body))
                    .catch(err => {
                        res.status(400).send([`Email is already in use`])
                    })
            } else {
                res.status(400).send([`Use a different email.`])
            }
        } catch (err) {
            res.status(400).send([`Email is already in use`])
            res.status(500).send([
                `An error has occured trying update user`
            ])
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            const stories = await Story.findAll({
                include: [{
                    model: User
                }]
            })
            const userStories = stories.map((value) => {
                if (value.Users[0].id == user.id) {
                    return value
                }
            })
            await user.removeStory(userStories)
            await user.destroy({})
            // if(userStories.length) {
            //     await userStories.destroy({}).then(() => res.send('this worked')).catch((err) => console.log(err))
            // }
            res.send('User deleted')
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to delete user`
            })
        }
    },
    async uploadFile(req, res) {
        try {
            aws.config.setPromisesDependency();
            aws.config.update({
                accessKeyId: process.env.AWS3_API_KEY,
                secretAccessKey: process.env.AWS3_API_SECRET,
                region: 'eu-central-1',
            });
            const s3 = new aws.S3();

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

            const imageName = uniqueSuffix + '-' + req.file.originalname

            const params = {
                ACL: 'public-read',
                Bucket: process.env.BUCKET_NAME,
                Body: fs.createReadStream(req.file.path),
                Key: imageName
            };
            s3.upload(params, async (err, data) => {
                if (err) {
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }
                if (data) {
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    const locationUrl = data.Location;
                    console.log('File uploaded to AWS Bucket!')
                    const user = await User.update({
                        icon_url: locationUrl
                    }, {
                        where: {
                            id: req.params.userId
                        }
                    })
                    if (user) {
                        res.json({
                            file: locationUrl
                        });
                    } else {
                        res.send({
                            err: 'User File Upload Error'
                        })
                    }
                }
            });
        } catch (error) {
            res.send({
                err: error
            })
        }
    },
    async retrieveFile(req, res) {
        const getParams = {
            Bucket: 'medio-bucket',
            Key: req.params.image_name
        };

        const s3 = new aws.S3();

        s3.getObject(getParams, function (err, data) {
            if (err) {
                res.status(400).send({
                    success: false,
                    err: err
                });
            } else {
                res.send({
                    image: data.Body
                });
            }
        });
    }
}