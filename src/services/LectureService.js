import axios from '@/services/axios'

export default {
    index() {
        return axios.get('lectures')
    },
    show(lectureId) {
        return axios.get(`lectures/${lectureId}`)
    },
    categories(categoryId){
        return axios.get(`lectures/categories/${categoryId}`)
    },
    showSimilar(categoryId, lectureId) {
        return axios.get(`lectures/categories/similar/${categoryId}/${lectureId}`)
    },
    showDifferent(categoryId, lectureId) {
        return axios.get(`lectures/categories/other/${categoryId}/${lectureId}`)
    },
    user(userId){
        return axios.get(`lectures/users/${userId}`)
    },
    post(lecture, userId) {
        return axios.post(`lectures/${userId}`, lecture)
    },
    put(lecture) {
        return axios.put(`lectures/${lecture.id}`, lecture)
    },
    delete(lectureId) {
        return axios.delete(`lectures/${lectureId}`)
    }
}