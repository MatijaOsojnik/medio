import axios from '@/services/axios'

export default {
    count() {
        return axios.get('admin/general/count', )
    },
    getRoles() {
        return axios.get('roles')
    },
    postHistory(userId, storyId) {
        return axios.post(`history/${storyId}/${userId}`)
    },
    getHistory(userId) {
        return axios.get(`history/${userId}`)
    },
    postBookmark(userId, storyId) {
        return axios.post(`bookmarks/${storyId}/${userId}`)
    },
    deleteBookmark(userId, storyId) {
        return axios.delete(`bookmarks/${storyId}/${userId}`)
    },
    getBookmarks(userId) {
        return axios.get(`bookmarks/${userId}`)
    },
    postLike(userId, storyId) {
        return axios.post(`likes/${storyId}/${userId}`)
    },
    deleteLike(userId, storyId) {
        return axios.delete(`likes/${storyId}/${userId}`)
    },
    getLikes(userId, storyId) {
        return axios.get(`likes/${storyId}/${userId}`)
    },
    search(content) {
        return axios.post(`search`, {
            content
        })
    }
}