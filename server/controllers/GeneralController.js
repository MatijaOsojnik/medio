const {
  User,
  Story,
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
      const stories = await Story.findAndCountAll({
        limit: 5
      });
      const categories = await Category.findAndCountAll({
        limit: 5
      });
      const roles = await Role.findAndCountAll({});
      res.send({
        users: users,
        stories: stories,
        categories: categories,
        roles: roles
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: `An error has occured trying to fetch stories`
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
          model: Story,
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
      const storyId = req.params.storyId
      const history = await History.create({
        story_id: storyId,
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
  async getBookmarks(req, res) {
        try {
          const userId = req.params.userId
          const bookmarks = await Bookmark.findAll({
            where: {
              user_id: userId
            },
            include: [{
              model: Story,
              include: [User]
            }],
            order: [
              ['createdAt', 'DESC']
            ]
          })
          console.log(bookmarks)
          res.send({bookmarks})
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch the history'
          })
        }
  },
  async postBookmark(req, res) {
    try {
      const userId = req.params.userId
      const storyId = req.params.storyId
      console.log(storyId, userId)
      const bookmark = await Bookmark.create({
        story_id: storyId,
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
      const storyId = req.params.storyId
      console.log(storyId, userId)
      const bookmark = await Bookmark.destroy({
        where: {
          story_id: storyId,
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