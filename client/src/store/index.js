//*Vuex 參考網址:https://ithelp.ithome.com.tw/articles/10185784
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import * as getters from './getters.js'
import * as actions from './action.js'

Vue.use(Vuex);

// state
export const state = {

}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,

    // 嚴格模式，禁止直接修改 state
    strict: true
});