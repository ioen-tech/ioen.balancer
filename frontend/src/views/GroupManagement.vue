.<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="mt-3">
          <h3>Energy Group</h3>
        </div>
        <div class="p-3" style="text-align: left">
          An energy group is your team and your teams goal is to achieve balance
          (low consumption, low production) as often as possible
        </div>
        <div class="p-3" style="text-align: left">
          Each time your team balances the grid your are rewarded!
        </div>
        <div class="p-3" style="text-align: left">
          <p>Choose your players wisely! 😊</p>
        </div>
        <form>
          <div class="mb-3">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="">Join Existing</span>
              </div>
              <input
                v-model="group_name"
                type="text"
                class="form-control"
                placeholder="Enter Groupname"
              />
              <button type="button" class="btn btn-primary" @click="joinGroup">
                submit
              </button>
            </div>
          </div>
          <div class="mb-3" v-if="this.$store.getters.isGroupAdmin">
            <button
              class="btn btn-secondary w-100"
              type="button"
              @click="createGroup"
              id="create_group"
            >
              Create New Group
            </button>
          </div>
        </form>

        <p class="errorMessage">{{ this.error_message }}</p>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { jSXAttribute } from "@babel/types";
import axios from "axios";
export default {
  name: "GroupManagement",
  data() {
    return {
      group_name: '',
      error_message: '',
    }
  },
  async created() {
    // Get the logged in user
    this.$store.dispatch('getLoggedInUser').then((res) => {
      this.$store.commit('setUser', res.data)
    }).catch((err) => {
      console.log(`err ${err}`)
      this.$router.push('/login')
    })
  },
  methods: {
    createGroup() {
      this.$router.push("/newgroup");
    },
    async joinGroup() {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.post('/users/join_group', {group_name: this.group_name}, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        // Store Group Info into localstore.
        this.$store.dispatch('getGroupInfo').then((group) => {
          this.$store.commit('setGroup', group.data)
        }).catch((err) => {
          console.log(err)
          this.$router.push('/groupmgmt')
        })

        this.$router.push('/home')
      } catch (err) {
        if (err.response.status != 200) {
          this.error_message = err.response.data.message
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log("unknown error")
        }
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