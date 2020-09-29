const {
  User,
  Story,
  Category,
  Role,
  History,
  Bookmark,
  Follower
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
  },

  async getFollowers(req, res) {
    try {
      const userId = req.params.userId
      const followers = await Follower.findAll({
        where: {
          follower_id: userId
        },
        include: [{
          include: [User]
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log(followers)
      res.send({
        followers
      })
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the followers'
      })
    }
  },

    async postFollow(req, res) {
      try {
        const followerId = req.body.followerId
        const followedId = req.body.followedId
        console.log(followerId, followedId)
        const follower = await Follower.create({
          follower_id: followerId,
          followed_id: followedId
        })
        res.send(follower)
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'an error has occured trying to create the follower object'
        })
      }
    },

      async deleteFollow(req, res) {
        try {
          const followerId = req.body.followerId
          const followedId = req.params.followedId
          const follow = await Follower.destroy({
            where: {
              follower_id: followerId,
              followed_id: followedId
            }
          })
          res.send("Follower removed")
        } catch (err) {
          console.log(err)
          res.status(500).send({
            error: 'an error has occured trying to create the bookmark object'
          })
        }
      },

}