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
          <div v-if="fileName">Filename: {{ fileName }}</div>
          <div class="mb-3">
            <div class="input-group">
              <input
                v-model="group_name"
                type="text"
                class="form-control"
                placeholder="Enter Groupname"
                required
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
import {Device} from '@capacitor/device'
export default {
  data() {
    return {
      group_name: "",
      min_users: "",
      max_users: "",
      reward_start_balance: "",
      error_message: "",
      selectedFile: null,
      fileName: ""
    };
  },
  created() {
    if (!this.$store.state.user) {
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

        // Store Group Info into localstore.
        this.$store.dispatch('getGroupInfo').then((group) => {
          this.$store.commit('setGroup', group.data)
        }).catch((err) => {
          console.log(err)
          this.$router.push('/groupmgmt')
        })

        this.$router.push("/home");
      } catch (err) {
        if (!this.selectedFile) {
          this.error_message = "Please select a logo to upload."
        } else {

          const dev = await Device.getInfo()
          if (dev.platform == 'ios') {
            if (err.status != 200) {
              this.error_message = `Uploaded image is invalid. Image must be less than 5Mb.`
            } else {
              this.error_message = `Unknown error occured!`
              console.log(err);
            }
          } else if (dev.platform == 'web') {
            if (err.response.status != 200) {
              this.error_message = `Uploaded image is invalid. Image must be less than 5Mb.`
            } else {
              this.error_message = `Unknown error occured!`
              console.log("unknown error");
            }
          }
        }
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name
    },
  },
};
</script>

<style scoped>
.errorMessage {
  color: red;
}
</style>