import axios from '@/services/axios'

export default {
    count() {
        return axios.get('admin/general/count',)
    },
    getRoles() {
        return axios.get('roles')
    },
    postHistory(userId, lectureId) {
        return axios.post(`history/${lectureId}/${userId}`)
    },
    getHistory(userId) {
        return axios.get(`history/${userId}`)
    }
}