import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    token: null,
  },
  getters: {
    isLoggedIn(state) {
      // Checks if user is logged in or not
      if (state.user) {
        console.log("user is logged in")
      } else {
        console.log("user is not logged in")
      }
      return state.user
    },
    isGroupAdmin(state) {

      if (state.user) {
        console.log(`user addmin is = ${state.user.is_group_admin}`)
        return state.user.is_group_admin
      } else {
        console.log('user state is NULL')
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {},
  modules: {},
});
