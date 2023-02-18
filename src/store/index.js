import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    token: null,
  },
  getters: {
    isLoggedIn(state) {
      // Checks if user is logged in or not
      return state.user
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
