import ArticleService from '@/services/ArticleService'

export default {
    namespaced: true,
    state: {
        items: [],
        item: {},
    },
    actions: {
        async fetchArticles({
            state,
            commit
        }, options = {
            reset: true
        }) {
            if (options.reset) {
                commit('setItems', {
                    resource: 'articles',
                    items: []
                }, {
                    root: true
                })
            }
            const response = await ArticleService.index()
            const articles = response.data
            commit('setItems', {
                resource: 'articles',
                items: articles
            }, {
                root: true
            })
            return state.items
        }
    }
}