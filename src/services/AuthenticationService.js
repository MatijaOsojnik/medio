import axios from '@/services/axios'

export default {
    register(credentials) {
        return axios.post('register', credentials)
    },
    login(credentials) {
        return axios.post('login', credentials)
    }
}