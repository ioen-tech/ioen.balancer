.<template>
  <!-- <h3 v-if="this.$store.getters.isGroupAdmin">I'm a group Addmin</h3>
  <h3 v-else>I'm a normal Person</h3>
  <h3 v-if="!this.$store.getters.isLoggedIn">You are Not Logged In</h3> -->
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="mb-3">
          <h4>{{ dates }}</h4>
        </div>
        <div class="mb-3">
          Group: {{ this.groupName }}
        </div>
        <div class="mb-3">
          <img :src="imgSrc" class="img-thumbnail" alt="logo" style="height: 100px; width: 100px;">
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import { ref } from '@vue/reactivity'
export default {
  data() {
    return {
      imgSrc: '',
      date: '',
      time: '',
      groupName: ''
    }
  },
  name: 'Home',
  setup() {
    const dates = ref(0)
    setInterval(() => {
      dates.value = moment().format('llll')
    }, 1000)

    return {dates}
  },
  async created() {
    // Get the logged in user
    this.$store.dispatch('getLoggedInUser').then((res) => {
      this.$store.commit('setUser', res.data)
    }).catch((err) => {
      console.log(`err ${err}`)
      this.$router.push('/login')
    })

    // Get Group Info
    this.$store.dispatch('getGroupInfo').then((group) => {
      this.imgSrc = axios.defaults.baseURL + 'logos/' + group.data.group_logo
      this.groupName = group.data.group_name
      this.$store.commit('setGroup', group.data)
    }).catch((err) => {
      console.log(err)
      this.$router.push('/login')
    })

  },
  methods: {
  }
}
</script>

<style>

</style>