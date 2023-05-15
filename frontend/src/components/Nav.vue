<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #041419;">
    <div class="container-fluid">
      <div v-if="this.$store.getters.isLoggedIn">
        <img v-if="this.$store.getters.isGroupMember" :src="this.$store.getters.getGroupLogo" width="30" height="30" class="d-inline-block align-top" alt=""> &nbsp;
        <a class="navbar-brand"> {{ this.$store.state.user.username }}</a>
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
        <button type="button" class="btn btn-outline-secondary" @click="logout" style="background-color: #041419;">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Nav',
  mounted() {
    const group = this.getGroupInfo()
    if (group) {
      this.$store.commit('setGroup', group)
    }
  },
  created() {
  },
  methods: {
    getGroupInfo() {
      return JSON.parse(localStorage.getItem('groupInfo'))
    },
    logout() {
      localStorage.setItem('token', null)
      localStorage.setItem('userInfo', null)
      localStorage.setItem('groupInfo', null)
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
      this.$store.commit('setGroup', null)

      this.$router.push('/login')
    },

  },
}
</script>