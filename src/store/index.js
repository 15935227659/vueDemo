import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import { setStore,getStore } from '../config/storage'
 
Vue.use(Vuex)

const state = {
     user:{
        memberName:'',
        memberpwd: ''
        }

}

const mutations = {
    REMEBER_USER (state,userInfo) {
        state.user.memberName = userInfo.memberName
        state.user.memberpwd = userInfo.memberpwd
        state.user.memberlvl = userInfo.memberlvl
        state.user.confirmMemberpwd = userInfo.confirmMemberpwd
        setStore('userInfo',JSON.stringify(userInfo))
        console.log(getStore('userInfo'))
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})
export default store