<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="mt-3">
          <h3>New Energy Group</h3>
        </div>
        <form role="form" @submit.prevent="handleSubmit">
          <div class="mb-3">
            <div class="input-group">
              <input
                v-model="group_name"
                type="text"
                class="form-control"
                placeholder="Enter Groupname"
              />
              <button type="button" class="btn btn-primary">Add Logo</button>
            </div>
          </div>
          <div class="mb-3">
            <input
              v-model="min_users"
              type="number"
              class="form-control"
              id="min_users"
              placeholder="Minimum users amount"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="max_users"
              type="number"
              class="form-control"
              id="max_users"
              placeholder="Maximum users amount"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="reward_start_balance"
              type="number"
              class="form-control"
              id="reward_start_balance"
              placeholder="Reward Starting Balance"
            />
          </div>
          <div class="mb-3">
            <button type="button" class="btn btn-secondary" @click="goBack">
              Back
            </button>
            <button type="submit" class="btn btn-primary m-3">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      group_name: '',
      min_users: 0,
      max_users: 0,
      reward_start_balance: 0,
    }
  },
  methods: {
    goBack() {
      this.$router.push("/groupmgmt");
    },
    async handleSubmit() {
      const groupInfo = {
        group_name: this.group_name,
        min_users: this.min_users,
        max_users: this.max_users,
        reward_start_balance: this.reward_start_balance
      }

      const token = localStorage.getItem('token')
      const res = await axios.post('/users/new_group', groupInfo, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      this.$router.push('/home')
    }
  },
};
</script>

<style>
</style>