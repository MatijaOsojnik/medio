import axios from '@/services/axios'

export default {
    index() {
        return axios.get('roles')
    },
    post(data) {
        return axios.post('roles', data)
    },
    put(data) {
        return axios.put('roles', data)
    },
    delete(roleId) {
        return axios.delete('roles', roleId)
    }
}