import axios from '@/services/axios'

export default {
    index() {
        return axios.get('users')
    },
    show(userId) {
        return axios.get(`users/${userId}`)
    },
    allUserInfo() {
        return axios.get(`users/admin`)
    },
    put(userId, data) {
        return axios.put(`users/${userId}`, data)
    },
    delete(userId) {
        return axios.delete(`users/${userId}`)
    }
    // changeAvatar(user, file) {
    //     return axios.put(`users/${user.id}`, file)
    // }
}