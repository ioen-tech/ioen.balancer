<template>
    <Nav/>
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
import Nav from "./components/Nav.vue"

export default({
  components: {
    Nav
  },
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
  async created() {
    this.$store.dispatch('getLoggedInUser').then((res) => {
      this.$store.commit('setUser', res.data)
      user = res.data
    }).catch((err) => {
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
