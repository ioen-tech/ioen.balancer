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
      if (state.user && state.group) {
        return true
      } else if (JSON.parse(localStorage.getItem('userInfo'))) {
        state.user = JSON.parse(localStorage.getItem('userInfo'))
        return true
      }
      return false
    },
    isGroupMember(state) {
      if (state.group) {
        return true
      } else if ( JSON.parse(localStorage.getItem('groupInfo'))) {
        state.group = JSON.parse(localStorage.getItem('groupInfo'))
        return true
      }
      return false
    },
    isGroupAdmin(state) {

      if (state.user) {
        return state.user.is_group_admin
      }
    },
    getGroupLogo(state) {
      if (state.group) {
        return axios.defaults.baseURL + 'logos/' + state.group.group_logo
      }
      return ''
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('userInfo', JSON.stringify(user))
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setGroup(state, group) {
      state.group = group
      localStorage.setItem('groupInfo', JSON.stringify(group))
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
    },
    async getEnergyLogs({commit}) {
      const token = localStorage.getItem('token')
      return await axios.get('/users/energy_logs', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    }
  },
  modules: {},
});
