import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    token: null,
    group: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.user
    },
    isGroupAdmin(state) {

      if (state.user) {
        return state.user.is_group_admin
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setGroup(state, group) {
      state.group = group
      localStorage.setItem('group', JSON.stringify(group))
    }
  },
  actions: {
    async getLoggedInUser({commit}) {
      const token = localStorage.getItem('token')
      return await axios.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    },

    async getGroupInfo({commit}) {
      const token = localStorage.getItem('token')
      return await axios.get('/users/get_group_info', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    },

    async getMyCollections({commit}) {
      const token = localStorage.getItem('token')
      return await axios.get('/users/my_collections', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    },

    async getStores({commit}) {
      const token = localStorage.getItem('token')
      return await axios.get('/users/stores', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    }
  },
  modules: {},
});
