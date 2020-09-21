const {
    Story,
    Category,
    User,
} = require('../models')

const {
    Op
} = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const stories = await Story.findAll({
                include: [Category, User]
            })
            res.send(stories)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch stories`
            })
        }
    },
    async post(req, res) {
        try {
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
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to create story`
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