const {
    Article,
    Category,
    User,
    Sentence,
    Tip
} = require('../models')

const {
    Op
} = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const articles = await Article.findAll({
                include: [{
                    model: Category,
                    required: true
                }, {
                    model: User,
                }]
            })
            res.send(articles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch articles`
            })
        }
    },
    async post(req, res) {
        try {
            const article = await Article.create(req.body)
                .then((article) => {
                    if (req.params.userId) {
                        User.findByPk(req.params.userId).then((user) => {
                            article.setUsers(user)
                        }).catch((err) => {
                            res.send({
                                err: err
                            })
                        })
                    }
                })
            res.send('Successful Article Creation')
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to create article`
            })
        }
    },
    async show(req, res) {
        try {
            const article = await Article.findByPk(req.params.articleId, {
                include: [User, Tip, Sentence]
            })
            res.send(article)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a article`
            })
        }
    },
    async user(req, res) {
        try {
            const articles = await Article.findAll({
                include: [{
                    model: User,
                    where: {
                        id: req.params.userId
                    }
                }]
            })
            res.send(articles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch articles`
            })
        }
    },
    async showSimilar(req, res) {
        try {
            console.log(req.params.articleId)
            const articles = await Article.findAll({
                where: {
                    [Op.and]: [{
                            category_id: req.params.categoryId
                        },
                        {
                            id: {
                                [Op.ne]: req.params.articleId
                            }
                        }
                    ],
                },
                include: [{
                    model: User
                }]
            })
            res.send(articles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch articles`
            })
        }
    },
    async showDifferent(req, res) {
        try {
            const articles = await Article.findAll({
                where: {
                    id: {
                        [Op.ne]: req.params.articleId
                    }
                },
                order: [
                    ['title', 'ASC']
                ],
                include: [{
                    model: User
                }]
            })
            res.send(articles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch articles`
            })
        }
    },
    async showCategories(req, res) {
        try {
            const articles = await Article.findAll({
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
            res.send(articles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch articles`
            })
        }
    },
    async put(req, res) {
        try {
            await Article.update(req.body, {
                where: {
                    id: req.params.articleId
                }
            })
            res.send(req.body)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to update a article`
            })
        }
    },
    async delete(req, res) {
        try {
            const article = await Article.destroy({
                where: {
                    id: req.params.articleId
                }
            })
            res.send('Successful article delete')
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying fetch a article`
            })
        }
    }
}