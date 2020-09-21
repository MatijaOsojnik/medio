import StoryService from '@/services/StoryService'

export default {
    namespaced: true,
    state: {
        items: [],
        item: {},
    },
    actions: {
        async fetchStories({
            state,
            commit
        }, options = {
            reset: true
        }) {
            if (options.reset) {
                commit('setItems', {
                    resource: 'stories',
                    items: []
                }, {
                    root: true
                })
            }
            const response = await StoryService.index()
            const stories = response.data
            commit('setItems', {
                resource: 'stories',
                items: stories
            }, {
                root: true
            })
            return state.items
        }
    }
}