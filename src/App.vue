<template>
    <Nav/>
    <router-view/>

    <div v-if="this.$store.getters.isLoggedIn">
      <BottomNav />
    </div>
</template>

<script>
import { PushNotifications } from '@capacitor/push-notifications';
import {Device} from '@capacitor/device'
import Nav from "./components/Nav.vue"
import BottomNav from "./components/BottomNav.vue"

export default({
  components: {
    Nav,
    BottomNav,
  },
  data() {
    return{
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
