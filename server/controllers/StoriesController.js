const {
    Story,
    Category,
    User,
} = require('../models')

const fs = require('fs')

const aws = require('aws-sdk')

const {
    Op
} = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const stories = await Story.findAll({
                include: [Category, User]
            })
            const storiesFeatured = await Story.findAll({
                where: {
                    featured: true
                },
                include: [Category, User]
            })
            res.send({
                stories,
                storiesFeatured
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch stories`
            })
        }
    },
    async post(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })
            
            if (user) {
                console.log(req.body)
                const story = await Story.create(req.body)
                            .then((story) => {
                                if (req.params.userId) {
                                    User.findByPk(req.params.userId).then((user) => {
                                        story.setUsers(user)
                                    }).catch((err) => {
                                        res.send({
                                            err: err
                                        })
                                    })
                                }
                            })
                        res.send('Successful Story Creation')

            } else {
                res.status(500).send({
                    error: `An error has occured trying to create story`
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to create story`
            })
        }
    },
    async imageUpload(req, res) {
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
                    s3.upload(params, (err, data) => {
                        if (err) {
                            console.log('Error occured while trying to upload to S3 bucket', err);
                        }
                        if (data) {
                            fs.unlinkSync(req.file.path); // Empty temp folder
                            const locationUrl = data.Location;
                            console.log('File uploaded to AWS Bucket!')
                            
                                res.json({
                                    file: locationUrl
                                });                          
                        }
                    });
                } catch (error) {
                    res.send({
                        err: error
                    })
                }
    },
    async show(req, res) {
        try {
            const story = await Story.findByPk(req.params.storyId, {
                include: [User]
            })
            res.send(story)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a story`
            })
        }
    },
    async user(req, res) {
        try {
            const stories = await Story.findAll({
                include: [{
                    model: User,
                    where: {
                        id: req.params.userId
                    }
                }]
            })
            res.send(stories)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch stories`
            })
        }
    },
    async showSimilar(req, res) {
        try {
            console.log(req.params.storyId)
            const stories = await Story.findAll({
                where: {
                    [Op.and]: [{
                            category_id: req.params.categoryId
                        },
                        {
                            id: {
                                [Op.ne]: req.params.storyId
                            }
                        }
                    ],
                },
                include: [{
                    model: User
                }]
            })
            res.send(stories)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch stories`
            })
        }
    },
    async showDifferent(req, res) {
        try {
            const stories = await Story.findAll({
                where: {
                    id: {
                        [Op.ne]: req.params.storyId
                    }
                },
                order: [
                    ['title', 'ASC']
                ],
                include: [{
                    model: User
                }]
            })
            res.send(stories)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch stories`
            })
        }
    },
    async showCategories(req, res) {
        try {
            const stories = await Story.findAll({
                where: {
                    category_id: req.params.categoryId
                },
                include: [{
                    model: Category,
                    required: true
                }, {
                    model: User,
                }]
            })
            res.send(stories)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch stories`
            })
        }
    },
    async put(req, res) {
        try {
            await Story.update(req.body, {
                where: {
                    id: req.params.storyId
                }
            })
            res.send(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to update a story`
            })
        }
    },
    async delete(req, res) {
        try {
            const story = await Story.destroy({
                where: {
                    id: req.params.storyId
                }
            })
            res.send('Successful story delete')
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a story`
            })
        }
    }
}