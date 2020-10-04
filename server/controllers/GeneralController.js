const {
  User,
  Story,
  Category,
  Role,
  History,
  Bookmark,
  Follower,
  Like
} = require('../models')

const {
  Op
} = require("sequelize");

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

        async getLikes(req, res) {
            try {
              const storyId = req.params.storyId
              const likes = await Like.findAll({
                where: {
                  story_id: storyId
                },
                include: [{
                  model: Story,
                  include: [User]
                }],
                order: [
                  ['createdAt', 'DESC']
                ]
              })
              const likesCount = await Like.findAndCountAll({
                where: {
                  story_id: storyId
                }
              })
              res.send({
                likes: likes,
                likesCount: likesCount
              })
            } catch (err) {
              res.status(500).send({
                error: 'an error has occured trying to fetch the likes'
              })
            }
          },
          async postLike(req, res) {
              try {
                const userId = req.params.userId
                const storyId = req.params.storyId
                const like = await Like.create({
                  story_id: storyId,
                  user_id: userId
                })
                res.send(like)
              } catch (err) {
                console.log(err)
                res.status(500).send({
                  error: 'an error has occured trying to create the like object'
                })
              }
            },
            async deleteLike(req, res) {
              try {
                const userId = req.params.userId
                const storyId = req.params.storyId
                const like = await Like.destroy({
                  where: {
                    story_id: storyId,
                    user_id: userId
                  }
                })
                res.send("Like removed")
              } catch (err) {
                console.log(err)
                res.status(500).send({
                  error: 'an error has occured trying to create the like object'
                })
              }
            },


      async search(req, res) {
        try {
          const content = req.body.content
          const users = await User.findAll({
            limit: 6,
            where: {
              display_name: {
                [Op.iLike]: '%' + content + '%'
              }
            }
          })
          const stories = await Story.findAll({
            limit: 6,
            where: {
              title: {
                [Op.iLike]: '%' + content + '%'
              }
            }
          })

          res.status(200).send({
            users,
            stories
          })

        } catch (err) {
          console.log(err)
          res.status(500).send({
            error: 'an error has occured trying to create the bookmark object'
          })
        }
      }

}