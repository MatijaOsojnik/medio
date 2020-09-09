import axios from '@/services/axios'

export default {
    index() {
        return axios.get('categories')
    },
    post(data) {
        return axios.post('categories', data)
    },
    put(data) {
        return axios.put('categories', data)
    },
    delete(categoryId) {
        return axios.delete('categories', categoryId)
    }
}