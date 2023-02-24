<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="mt-3">
          <br />
          <h3>New Energy Group</h3>
          <br />
        </div>
        <form role="form" @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="mb-3">
            <!-- <label for="formFile" class="form-label d-flex justify-content-start">Select Group Logo</label> -->
            <input
              class="form-control"
              type="file"
              @change="onFileSelected"
              id="formFile"
              ref="fileInput"
              style="display: none"
            />
          </div>
          <div class="mb-3">
            <div class="input-group">
              <input
                v-model="group_name"
                type="text"
                class="form-control"
                placeholder="Enter Groupname"
              />
              <button
                type="button"
                @click="this.$refs.fileInput.click()"
                class="btn btn-success"
                style="width: 30%"
              >
                Add Logo
              </button>
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

          <p class="errorMessage">{{ error_message }}</p>
          <div class="mb-3">
            <button
              type="button"
              class="btn btn-secondary"
              @click="goBack"
              style="width: 30%"
            >
              Back
            </button>
            <button
              type="submit"
              class="btn btn-primary m-3"
              style="width: 30%"
            >
              Submit
            </button>
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
      group_name: "",
      min_users: "",
      max_users: "",
      reward_start_balance: "",
      error_message: "",
      selectedFile: null,
    };
  },
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    goBack() {
      this.$router.push("/groupmgmt");
    },
    async handleSubmit() {
      try {
        const fd = new FormData();
        fd.append("files", this.selectedFile, this.selectedFile.name);

        fd.append("group_name", this.group_name)
        fd.append("min_users", this.min_users)
        fd.append("max_users", this.max_users)
        fd.append("reward_start_balance", this.reward_start_balance)

        const token = localStorage.getItem("token");
        const res = await axios.post("/users/new_group", fd,{
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        this.$router.push("/home");
      } catch (err) {
        if (err.response.status != 200) {
          this.error_message = err.response.data.message;
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("unknown error");
        }
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.errorMessage {
  color: red;
}
</style>