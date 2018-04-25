
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
    logged: false,
    accessToken: null,
    refreshToken: null,
    alert: null,
    time: 0,
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})