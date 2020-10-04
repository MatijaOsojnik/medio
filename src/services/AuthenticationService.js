import axios from '@/services/axios'

export default {
    register(credentials) {
        return axios.post('register', credentials)
    },
    login(credentials) {
        return axios.post('login', credentials)
    },
    googleAuth(user) {
        return axios.post('auth/google', user)
    },
    facebookAuth(user) {
        return axios.post('auth/facebook', user)
    }
}