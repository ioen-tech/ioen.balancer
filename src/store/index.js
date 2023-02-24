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
      // Checks if user is logged in or not
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
    },
    setToken(state, token) {
      state.token = token
    },
    setGroup(state, group) {
      state.group = group
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
    }
  },
  modules: {},
});
