import LectureService from '@/services/LectureService'

export default {
    namespaced: true,
    state: {
        items: [],
        item: {},
    },
    actions: {
        async fetchLectures({
            state,
            commit
        }, options = {
            reset: true
        }) {
            if (options.reset) {
                commit('setItems', {
                    resource: 'lectures',
                    items: []
                }, {
                    root: true
                })
            }
            const response = await LectureService.index()
            const lectures = response.data
            commit('setItems', {
                resource: 'lectures',
                items: lectures
            }, {
                root: true
            })
            return state.items
        }
    }
}