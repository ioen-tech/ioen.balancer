<template>
  <div class="container">
    <br />
    <h1>Login to Nanogrid</h1>
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <p class="errorMessage">{{ error_message }}</p>
        <form @submit.prevent="handleLogIn">
          <div class="mb-3">
            <input
              v-model="username"
              type="username"
              class="form-control"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="mb-3 form-check">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 50%">Login</button>
        </form>
        <div class="d-flex flex-row mt-5 justify-content-center">
          <p>Don't have an account?&nbsp;</p><router-link to="/register">SignUp</router-link>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {Device} from '@capacitor/device'

export default {
  name: 'Login',
  created() {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      // Redirect to home page
      this.$router.push('/home')
    }
  },
  methods: {
    async handleLogIn() {
      try {
        const res = await axios.post('/users/sign_in', {
          "username": this.username,
          "password": this.password
        })

        const {token, route} = res.data
        this.$store.commit('setToken', token)

        // Get logged In user and store into localstorage.
        const userInfo = await this.$store.dispatch('getLoggedInUser')
        this.$store.commit('setUser', userInfo.data)
        localStorage.setItem('userInfo', JSON.stringify(userInfo.data))

        // Get user group info and store into localstorage.
        const groupInfo = await this.$store.dispatch('getGroupInfo')
        this.$store.commit('setGroup', groupInfo.data)
        localStorage.setItem('groupInfo', JSON.stringify(groupInfo.data))

        this.$router.push(route)
      } catch(e) {
        // For some reason, axios response has a different structure for web and for ios.
        // Still to confirm for android
        const dev = await Device.getInfo()
        if (dev.platform == 'ios') {
          if (e.status != 200) {
            this.error_message = 'Incorrect username and/or password!'
          }
        } else if (dev.platform == 'web') {
          if (e.response.status != 200) {
            this.error_message = 'Incorrect username and/or password!'
          }
        } else {
          if (e.response.status != 200) {
            this.error_message = 'Incorrect username and/or password!'
          }
        }
        console.log(e)
      }
    
    }
  },
  data() {
    return {
      username: '',
      password: '',
      error_message: '',
    }
  }

};
</script>

<style scoped>
.errorMessage {
  color: red
}

</style>