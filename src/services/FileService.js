import axios from '@/services/axios'

export default {
    index(userId, file) {
        return axios.post(`users/${userId}/upload`, file)
    },
}