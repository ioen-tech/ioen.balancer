<template>
  <div class="container">
    <br />
    <h1>Register to Nanogrid</h1>
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <p class="errorMessage">{{ error_message }}</p>
        <form role="form" @submit.prevent="handleSubmit">
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
              v-model="email"
              type="email"
              class="form-control"
              id="email_address"
              placeholder="Email Address"
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
          <div class="mb-3">
            <input
              v-model="fronius_userid"
              type="text"
              class="form-control"
              id="fronius_userid"
              placeholder="Fronius User ID"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_password"
              type="password"
              class="form-control"
              id="fronius_password"
              placeholder="Fronius Password"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_accesskey_id"
              type="text"
              class="form-control"
              id="fronius_accesskey_id"
              placeholder="Fronius AccessKey ID"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_accesskey_value"
              type="text"
              class="form-control"
              id="fronius_accesskey_value"
              placeholder="Fronius AccessKey Value"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="fronius_device_id"
              type="text"
              class="form-control"
              id="fronius_device_id"
              placeholder="Fronius Device ID"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="retailer"
              type="text"
              class="form-control"
              id="retailer"
              placeholder="Retailer"
              required
            />
          </div>
          <div class="mb-3">
            <select class="form-select" aria-label="Meter Hardware Options" required>
              <option selected>Please Select your Meter Hardware</option>
              <option value="1">Fronius</option>
            </select>
          </div>
          <div class="input-group">
            <input
              v-model="wallet_address"
              type="text"
              class="form-control"
              id="wallet_address"
              placeholder="Wallet Address"
              required
            />
              <button type="button" class="btn btn-success">Create New Wallet</button>
          </div>
          <div class="mt-3">
            <button type="submit" class="btn btn-primary" style="width: 50%">Register</button>
          </div>
        </form>
        <div class="d-flex flex-row mt-5 justify-content-center">
          <p>Already have an account?&nbsp;</p><router-link to="/login">Login</router-link>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
import {Device} from '@capacitor/device'

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      fronius_userid: "",
      fronius_password: "",
      fronius_accesskey_id: "",
      fronius_accesskey_value: "",
      fronius_device_id: "",
      retailer: "",
      meter_hardware: "",
      wallet_address: "",
      error_message:"",
    };
  },
  methods: {
    async handleSubmit() {
      try {
      const userInfo = {
        username: this.username,
        email: this.email,
        password: this.password,
        fronius_userid: this.fronius_userid,
        fronius_password: this.fronius_password,
        fronius_accesskey_id: this.fronius_accesskey_id,
        fronius_accesskey_value: this.fronius_accesskey_value,
        fronius_device_id: this.fronius_device_id,
        retailer: this.retailer,
        meter_hardware: this.meter_hardware,
        wallet_address: this.wallet_address,
      };

      const res = await axios.post("/users", userInfo);

      this.$router.push("/registered");
      } catch(e) {
        const dev = await Device.getInfo()
        if (dev.platform == 'ios') {
          if (e.status != 200) {
            this.error_message = e.data.message
          }
        } else if (dev.platform == 'web') {
          if (e.response.status != 200) {
            this.error_message = e.response.data.message
          }
        }
        console.log(e)
      }
    },
  },
};
</script>

<style scoped>
.errorMessage {
  color: red
}
</style>