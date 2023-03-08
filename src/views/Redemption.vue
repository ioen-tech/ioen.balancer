.<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="header d-flex">
          <h3>10000</h3>
          <h5>IOEN Balance</h5>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment-timezone'
import nanologo from "@/assets/img/redgrid-logo.gif";
import {Device} from '@capacitor/device'

export default {
  data() {
    return {
      nanologo,
    }
  },
  name: 'Redemption',
  created() {
    // Get the logged in user
    this.$store.dispatch('getLoggedInUser').then((res) => {
      this.$store.commit('setUser', res.data)
    }).catch((err) => {
      console.log(`err ${err}`)
      this.$router.push('/login')
    })

    // Get Group Info
    this.$store.dispatch('getGroupInfo').then((group) => {
      console.log("Create get Group Info")
      this.imgSrc = axios.defaults.baseURL + 'logos/' + group.data.group_logo
      this.groupName = group.data.group_name
      this.$store.commit('setGroup', group.data)
      this.groupEnergy = group.data.group_energy
      this.updateBackground(this.groupEnergy)
    }).catch((err) => {
      console.log(err)
      // this.$router.push('/login')
    })

    
    const dev = Device.getInfo()
    if (dev.platform != 'web') {
      console.log("Platform is Mobile")
      this.registerNotifications()
    } else {
      console.log("Platform is WEB")
    }

  },
  methods: {
  }
}
</script>

<style scoped>

</style>