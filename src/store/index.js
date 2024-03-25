import { createStore } from 'vuex'

import user from './modules/user.js'
import businessINFO from './modules/businessInfo.js'

export default createStore({
    modules: {
        user,
        businessINFO,
    }
})