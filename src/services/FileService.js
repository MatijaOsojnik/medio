import axios from '@/services/axios'

export default {
    index(userId, file) {
        return axios.post(`users/${userId}/upload`, file)
    },
    profileImage(userId, imagename) {
        return axios.put(`users/${userId}/upload/${imagename}`,)
    }
}