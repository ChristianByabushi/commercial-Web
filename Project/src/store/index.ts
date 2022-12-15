import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'
import axiosClient from '../axios/axios'
let axios = axiosClient
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: [],
    loggin: false,
    handleDrawer: false,
    drawer: false ,
    merchandises :[]
  },
  getters: {
    getDrawer(state) {
      return state.drawer
    },
    userInfo: state => {
      return state.userInfo;
    }, 
    merchandises : state => {
      return state.merchandises
    }
  },
  mutations: {
    logout(state, status) {
      state.loggin = status
    },
    setDrawer(state) {
      state.drawer = !state.drawer
    },
    setGetUserinfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setGetMerchandises(state, mses) {
      state.merchandises = mses
    }
  },
  actions: {
    async getInfoUser() {
      try {
        const response = await axios.post('user/getInforAccount/' + localStorage.getItem('username'))
        this.commit("setGetUserinfo", response.data) 
      } catch (e) {
        console.log(e)
      }
    },     
    async get_merchandise() {
			try { 
				const response = await axios.post('merchandise') 
        this.commit("setGetMerchandises", response.data)       
      } catch (e) {
				console.log(e)
			}
		},
  }
})
