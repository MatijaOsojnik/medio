const {
  User,
  Article,
  Category,
  Role,
  History,
  Bookmark
} = require('../models')

module.exports = {
  async count(req, res) {
    try {
      const users = await User.findAndCountAll({
        limit: 5
      });
      const articles = await Article.findAndCountAll({
        limit: 5
      });
      const categories = await Category.findAndCountAll({
        limit: 5
      });
      const roles = await Role.findAndCountAll({});
      res.send({
        users: users,
        articles: articles,
        categories: categories,
        roles: roles
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: `An error has occured trying to fetch articles`
      })
    }
  },
  async findHistory(req, res) {
    try {
      const userId = req.params.userId
      const histories = await History.findAll({
        where: {
          user_id: userId
        },
        include: [{
          model: Article,
          include: [User]
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      res.send(histories)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the history'
      })
    }
  },
  async postHistory(req, res) {
    try {
      const userId = req.params.userId
      const articleId = req.params.articleId
      const history = await History.create({
        article_id: articleId,
        user_id: userId
      })
      res.send(history)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the history object'
      })
    }
  },
  async findBookmarks(req, res) {
        try {
          const userId = req.params.userId
          const bookmarks = await Bookmark.findAll({
            where: {
              user_id: userId
            },
            include: [{
              model: Article,
              include: [User]
            }],
            order: [
              ['createdAt', 'DESC']
            ]
          })
          res.send(bookmarks)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch the history'
          })
        }
  },
  async postBookmark(req, res) {
    try {
      const userId = req.params.userId
      const articleId = req.params.articleId
      console.log(articleId, userId)
      const bookmark = await Bookmark.create({
        article_id: articleId,
        user_id: userId
      })
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the bookmark object'
      })
    }
  },
  async deleteBookmark(req, res) {
    try {
      const userId = req.params.userId
      const articleId = req.params.articleId
      console.log(articleId, userId)
      const bookmark = await Bookmark.destroy({
        where: {
          article_id: articleId,
          user_id: userId
        }
      })
      res.send("Bookmark removed")
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the bookmark object'
      })
    }
  }

}