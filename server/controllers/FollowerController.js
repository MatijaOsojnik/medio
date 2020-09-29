const {
    User,
    Follower
} = require('../models')

module.exports = {
    async findFollower(req, res) {
        try {
            console.log(req.body)
            const followerId = req.body.followerId;
            const followedId = req.body.followedId;
            console.log('followerId' + followerId)
            const isFollowing = await Follower.findOne({
                where: {
                    follower_id: followerId,
                    followed_id: followedId
                }
            })
            if (isFollowing) {
                res.send(true)
            } else {
                res.send(false)
            }

        } catch (error) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the followers'
            })
        }
    },
    async getFollowers(req, res) {
        try {
            const userId = req.body.followerId
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