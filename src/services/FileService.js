import axios from '@/services/axios'

export default {
    index(userId, file) {
        return axios.post(`users/${userId}/upload`, file)
    },
    profileImage(imagename) {
        return axios.get(`/upload/${imagename}`)
    },
    uploadImage(file) { 
        return axios.post(`upload`, file)
    }
}