<template>
  <nav>
    <div v-if="!this.$store.getters.isLoggedIn">
    <router-link to="/login" >Login</router-link> |
    <router-link to="/register">Register</router-link>
    </div>

    <div v-if="this.$store.getters.isLoggedIn">
    <a href="/login" @click="logout">Logout</a>
    </div>

  </nav>
  <router-view />
</template>

<script>
export default({
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
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
