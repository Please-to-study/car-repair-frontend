// 业务信息
export default {
    namespaced: true,
    state: {
        businessID: 1,
        outsideOrderID: "1",
        couponBatchID: "1",
        couponCollectionMethod: 1,
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        getInfo(state) {
            return state
        }
    }
}