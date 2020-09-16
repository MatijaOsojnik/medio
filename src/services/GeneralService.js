import axios from '@/services/axios'

export default {
    count() {
        return axios.get('admin/general/count',)
    },
    getRoles() {
        return axios.get('roles')
    },
    postHistory(userId, articleId) {
        return axios.post(`history/${articleId}/${userId}`)
    },
    getHistory(userId) {
        return axios.get(`history/${userId}`)
    },
    postBookmark(userId, articleId) {
        return axios.post(`bookmarks/${articleId}/${userId}`)
    },
    deleteBookmark(userId, articleId) {
        return axios.delete(`bookmarks/${articleId}/${userId}`)
    },
    getBookmarks(userId) {
        return axios.get(`bookmarks/${userId}`)
    }
}