<template>
  <div class="container">
    <h1>Login to Nanogrid</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <p class="errorMessage">{{ error_message }}</p>
        <form @submit.prevent="handleLogIn">
          <div class="mb-3">
            <input
              v-model="email_address"
              type="username"
              class="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div class="mb-3 form-check">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  methods: {
    async handleLogIn() {
      try {
        const res = await axios.post('/users/sign_in', {
          "email_address": this.email_address,
          "password": this.password
        })
  
        const {token} = res.data
        this.$store.commit('setToken', token)
        localStorage.setItem('token', token)

        this.$router.push('/home')
      } catch (err) {
        if (err.response.status != 200) {
          console.log(err.response.data)
          this.error_message = 'Incorrect username and/or password'
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log("unknown error")
        }
      }
      
    }
  },
  data() {
    return {
      email_address: '',
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