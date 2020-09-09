import CategoryService from '@/services/CategoryService'

export default {
    namespaced: true,
    state: {
        items: []
    },
    actions: {
        async fetchCategories({state, commit}) {
            const response = await CategoryService.index()
            const categories = response.data
            commit('setItems', {resource: 'categories', items: categories}, {root: true})
            return state.items
        }
    }
}