<template>
    <!-- Image and text -->
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

    <router-view/>

    <div v-if="this.$store.getters.isLoggedIn">
    <RingBottomNavigation :options="options" v-model="selected" />
    </div>
</template>

<script>
import { PushNotifications } from '@capacitor/push-notifications';
import {Device} from '@capacitor/device'
import { RingBottomNavigation, WindowsBottomNavigation } from "bottom-navigation-vue"
import "bottom-navigation-vue/dist/style.css"

export default({
  data() {
    return{
      selected: 1,
      options: [
        { id: 1, icon: 'fa-solid fa-house', title: 'Dashboard', path:'/home' },
        // { id: 2, icon: 'fa-solid fa-user-secret', title: 'Game', path:'/game' },
        { id: 3, icon: 'fa-solid fa-gear', title: 'Redemption', path: '/redemption' }
      ],
      token: ''
    }
  },
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
      this.$store.commit('setGroup', null)

      this.$router.push('/login')
    },

  },
  async created() {
    // Get the logged in user
    this.$store.dispatch('getLoggedInUser').then((res) => {
      this.$store.commit('setUser', res.data)
      this.$router.push('/home')
    }).catch((err) => {
      console.log(`err ${err}`)
      this.$router.push('/login')
    })

  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
