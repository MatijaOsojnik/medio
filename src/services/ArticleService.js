import axios from '@/services/axios'

export default {
    index() {
        return axios.get('articles')
    },
    show(articleId) {
        return axios.get(`articles/${articleId}`)
    },
    categories(categoryId){
        return axios.get(`articles/categories/${categoryId}`)
    },
    showSimilar(categoryId, articleId) {
        return axios.get(`articles/categories/similar/${categoryId}/${articleId}`)
    },
    showDifferent(categoryId, articleId) {
        return axios.get(`articles/categories/other/${categoryId}/${articleId}`)
    },
    user(userId){
        return axios.get(`articles/users/${userId}`)
    },
    post(article, userId) {
        return axios.post(`articles/${userId}`, article)
    },
    put(article) {
        return axios.put(`articles/${article.id}`, article)
    },
    delete(articleId) {
        return axios.delete(`articles/${articleId}`)
    }
}