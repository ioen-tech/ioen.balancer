<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div v-if="this.$store.getters.isLoggedIn">
        <a class="navbar-brand">{{ this.$store.state.user.username }}</a>
      </div>
      <div v-else>
        <a class="navbar-brand" href="#">Nanogrid</a>
      </div>
      <!-- <router-link to="/home" class="navbar-brand" v-if="this.$store.getters.isLoggedIn">Hello {{ this.$store.state.user.username }}</router-link> -->
      <div v-if="!this.$store.getters.isLoggedIn">
        <router-link to="/login" class="text-white">Login</router-link> |
        <router-link to="/register" class="text-white">Register</router-link>
      </div>
      <div v-if="this.$store.getters.isLoggedIn">
        <button type="button" class="btn btn-outline-secondary" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
      this.$store.commit('setGroup', null)

      this.$router.push('/login')
    },

  },
}
</script>