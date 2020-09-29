import axios from '@/services/axios'

export default {
    findFollower(followerId, followedId) {
        return axios.get(`followers/single`, {
            followerId,
            followedId
        })
    },
    postFollow(followerId, followedId) {
        return axios.post(`followers`, {
            followerId,
            followedId
        })
    },
    deleteFollow(followerId, followedId) {
        return axios.delete(`followers`, {
            followerId,
            followedId
        })
        },
    getFollowers(followerId) {
        return axios.get(`followers`, {followerId})
    },
}