// 用户
export default {
    namespaced: true,
    state: {
        userid: '',
    },
    mutations: {
        updateInfo(state, val) {
            state.userid = val
        },
    },
    actions: {
    },
    getters: {
        getInfo(state) {
            return state
        }
    }
}