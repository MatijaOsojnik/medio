import axios from '@/services/axios'

export default {
    index() {
        return axios.get('stories')
    },
    show(storyId) {
        return axios.get(`stories/${storyId}`)
    },
    categories(categoryId){
        return axios.get(`stories/categories/${categoryId}`)
    },
    showSimilar(categoryId, storyId) {
        return axios.get(`stories/categories/similar/${categoryId}/${storyId}`)
    },
    showDifferent(categoryId, storyId) {
        return axios.get(`stories/categories/other/${categoryId}/${storyId}`)
    },
    imageUpload(storyId, data) {
        return axios.post(`stories/${storyId}/upload`, data)
    },
    user(userId){
        return axios.get(`stories/users/${userId}`)
    },
    post(story, userId) {
        return axios.post(`stories/${userId}`, story)
    },
    put(story) {
        return axios.put(`stories/${story.id}`, story)
    },
    delete(storyId) {
        return axios.delete(`stories/${storyId}`)
    }
}