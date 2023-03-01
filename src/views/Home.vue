.<template>
  <!-- <h3 v-if="this.$store.getters.isGroupAdmin">I'm a group Addmin</h3>
  <h3 v-else>I'm a normal Person</h3>
  <h3 v-if="!this.$store.getters.isLoggedIn">You are Not Logged In</h3> -->
  <main :class=bodyBackground>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <br>
        <br>
        <div id="clock">
          <h2 class="date">{{ dates }}</h2>
          <h1 class="time">{{ time }}</h1>
          <br>
          <img :src="nanologo">
          <div>
            AccruedIOEN: <br>
            <button type="button" class="btn btn-secondary" style="width: 30%">REDEEM </button> <br>
            MyIOEN: <br>
            Group Energy: {{ this.groupEnergy }}<br>
          </div>
          <div class="mb-3">
            {{ this.groupName }}
          </div>
          <div class="mb-1">
            <img :src="imgSrc" class="img-thumbnail" alt="logo" style="height: 100px; width: 100px;">
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
  </main>
</template>

<script>
import axios from 'axios';
import moment from 'moment-timezone'
import { ref } from '@vue/reactivity'
import nanologo from "@/assets/img/redgrid-logo.gif";
export default {
  data() {
    return {
      imgSrc: '',
      date: '',
      time: '',
      groupName: '',
      groupEnergy: 0,
      bodyBackground: 'producing',
      nanologo,
    }
  },
  name: 'Home',
  setup() {
    const dates = ref(0)
    const time = ref(0)
    setInterval(() => {
      dates.value = moment().tz('Australia/Victoria').format('dddd, MMM D YYYY')
      time.value = moment().tz('Australia/Victoria').format('hh:mm:A')
    }, 1000)

    return {dates, time}
  },
  mounted() {

    var self = this
    this.updateBackground()
    setInterval(async function() {
    // Get Group Info
      self.$store.dispatch('getGroupInfo').then((group) => {
        self.imgSrc = axios.defaults.baseURL + 'logos/' + group.data.group_logo
        self.groupName = group.data.group_name
        self.$store.commit('setGroup', group.data)
        self.groupEnergy = group.data.group_energy
        self.updateBackground(self.groupEnergy)
      }).catch((err) => {
        console.log(err)
        self.$router.push('/login')
      })

    }, 5 * 60 * 1000) // 5minute interval (min * sec * millisecond)

  },
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
      this.imgSrc = axios.defaults.baseURL + 'logos/' + group.data.group_logo
      this.groupName = group.data.group_name
      this.$store.commit('setGroup', group.data)
      this.groupEnergy = group.data.group_energy
      this.updateBackground(this.groupEnergy)
    }).catch((err) => {
      console.log(err)
      this.$router.push('/login')
    })

  },
  methods: {
    async updateBackground(energy) {
      if (energy > -500 && energy < 500) {
        this.bodyBackground = 'balanced'
      } else if (energy < -500) {
        this.bodyBackground = 'producing'
      } else {
        this.bodyBackground = 'consuming'
      }
    }
  }
}
</script>

<style scoped>
.consuming {
  height: 100%;
  background: #0f3854;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #041419 70%);
  background-size: 100%;
}

.producing {
  height: 100%;
  background: #00cc99;
  background: radial-gradient(ellipse at center, #00cc99 0%, #041419 70%);
  background-size: 100%;
}

.balanced {
  height: 100%;
  background: #e6cc0a;
  background: radial-gradient(ellipse at center, #e6cc0a 0%, #041419 70%);
  background-size: 100%;
}

.dashboard {
  background-color: blue;
  height: 100vmax;
}

.main-wrapper{
  height: 100vh; 
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 0;
}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
#clock .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}

</style>