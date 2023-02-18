<template>
  <div class="container">
    <h1>Register to Nanogrid</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form role="form" @submit.prevent="handleSubmit">
          <div class="mb-3">
            <input
              v-model="username"
              type="username"
              class="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email_address"
              placeholder="Email Address"
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
          <div class="mb-3">
            <input
              v-model="fronius_userid"
              type="text"
              class="form-control"
              id="fronius_userid"
              placeholder="Fronius User ID"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_password"
              type="text"
              class="form-control"
              id="fronius_password"
              placeholder="Fronius Password"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_accesskey_id"
              type="text"
              class="form-control"
              id="fronius_accesskey_id"
              placeholder="Fronius AccessKey ID"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_accesskey_value"
              type="text"
              class="form-control"
              id="fronius_accesskey_value"
              placeholder="Fronius AccessKey Value"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="retailer"
              type="text"
              class="form-control"
              id="retailer"
              placeholder="Retailer"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="meter_hardware"
              type="text"
              class="form-control"
              id="meter_hardware"
              placeholder="Meter Hardware"
            />
          </div>
          <div class="mb-3 form-check"></div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      fronius_userid: '',
      fronius_password: '',
      fronius_accesskey_id: '',
      fronius_accesskey_value: '',
      retailer: '',
      meter_hardware: '',
    }
  },
  methods: {
    async handleSubmit() {
      const userInfo = {
        username: this.username,
        email: this.email,
        password: this.password,
        fronius_userid: this.fronius_userid,
        fronius_password: this.fronius_password,
        fronius_accesskey_id: this.fronius_accesskey_id,
        fronius_accesskey_value: this.fronius_accesskey_value,
        retailer: this.retailer,
        meter_hardware: this.meter_hardware
      };

      const res = await axios.post('/users', userInfo)

      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
</style>