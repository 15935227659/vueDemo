import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import { setStore,getStore } from '../config/storage'
 
Vue.use(Vuex)

const state = {
     user:{
        username:'',
        name: '',
        userPhoto:''
    }

}

const mutations = {
    REMEBER_USER (state,userInfo) {
        state.user.username = userInfo.username
        state.user.name = userInfo.name
        state.user.userPhoto = userInfo.userPhoto
        state.user.confirmMemberpwd = userInfo.confirmMemberpwd
        setStore('userInfo',JSON.stringify(userInfo))
        
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})
export default store