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

export default {
  name: 'Login',
  methods: {
    async handleLogIn() {
      try {
        const res = await axios.post('/users/sign_in', {
          "username": this.username,
          "password": this.password
        }, {withCredentials:true}
        )
  
        const {token, route} = res.data
        this.$store.commit('setToken', token)
        localStorage.setItem('token', token)

        this.$router.push(route)
      } catch (err) {
        if (err.response.status != 200) {
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