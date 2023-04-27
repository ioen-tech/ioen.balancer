<template>
    <Nav />
    <router-view/>

    <div v-if="this.$store.getters.isLoggedIn && this.$store.getters.isGroupMember">
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
      userInfo: null,
      username: '',
      isUserLoggedIn: false,
      connection: null
    }
  },
  mounted() {
    if (this.userInfo) {
      this.username = this.userInfo.username
    }
  },
  created() {
    this.getUserInfo()
    if (!this.userInfo) {
      this.$router.push('/login')
    }
  },
  methods: {
    sendMessage(message) {
      this.connection.send(message)
    },
    getUserInfo () {
      return this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    getLoggedInUser() {
      if (this.userInfo) {
        this.isUserLoggedIn = true
        return true
      }
      return false
    }
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
