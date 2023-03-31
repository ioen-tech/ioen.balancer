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

        <!-- <form role="form" @submit.prevent="handleSubmit" enctype="multipart/form-data"> -->
        <div id="clock" class="d-flex justify-content-around flex-row align-items-center">
          <div>
            <h3>$150</h3>
            <p>Credit</p>
          </div>
          <div>
            <img :src="imgSrc" class="img-thumbnail" alt="logo" style="height: 50px; width: 50px;">
            <p>{{  this.groupName  }}</p>
          </div>
          <div>
            <h3>{{ this.groupEnergy }}</h3>
            <p>Group Energy</p>
          </div>
          <div>
            <h3>{{ this.rewards_points }}</h3>
            <p>I O E N</p>
          </div>
        </div>
        <!-- </form> -->
        <ChartComponent/>
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
import { PushNotifications } from '@capacitor/push-notifications';
import {Device} from '@capacitor/device';
import ChartComponent from '../components/ChartComponent.vue';

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
      fcmToken: null,
      rewards_points: 0,
    }
  },
  name: 'Home',
  components: {
    ChartComponent
  },
  setup() {
    const dates = ref(0)
    const time = ref(0)
    setInterval(() => {
      dates.value = moment().tz('Australia/Victoria').format('dddd, MMM D YYYY')
      time.value = moment().tz('Australia/Victoria').format('hh:mm:A')
      // time.value = moment().tz('Australia/Victoria').format('hh:mm:ss A')
    }, 1000)

    return {dates, time}
  },
  mounted() {
    
    var self = this
    this.updateBackground()

    setInterval(async function() {

      // Get the updated user info
      self.$store.dispatch('getLoggedInUser').then((res) => {
        self.$store.commit('setUser', res.data)
        self.rewards_points = res.data.rewards_points
      })
      // Get Group Info
      self.$store.dispatch('getGroupInfo').then((group) => {
        self.$store.commit('setGroup', group.data)
        self.groupEnergy = group.data.group_energy
        self.updateBackground(self.groupEnergy)
      })

    }, 5 * 60 * 1000) // 5minute interval (min * sec * millisecond)

  },
  created() {
    // Get the logged in user
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      this.$store.dispatch('getLoggedInUser').then((res) => {
        this.$store.commit('setUser', res.data)
        user = res.data
      }).catch((err) => {
        this.$router.push('/login')
      })
    }
    let group = JSON.parse(localStorage.getItem('group'))
    if (!group) {
      // Store Group Info into localstore.
      this.$store.dispatch('getGroupInfo').then((group) => {
        this.$store.commit('setGroup', group.data)
        group = group.data
        // Set the local variables.
        this.imgSrc = axios.defaults.baseURL + 'logos/' + group.group_logo
        this.groupName = group.group_name
        this.groupEnergy = group.group_energy
        this.updateBackground(this.groupEnergy)
      }).catch((err) => {
        console.log(err)
        this.$router.push('/groupmgmt')
      })
    } else {
      // Set the local variables.
      this.imgSrc = axios.defaults.baseURL + 'logos/' + group.group_logo
      this.groupName = group.group_name
      this.groupEnergy = group.group_energy
      this.updateBackground(this.groupEnergy)
    }


    // Send a notification request only for mobile app.
    const dev = Device.getInfo()
    if (dev.platform != 'web') {
      this.registerNotifications()
    } else {
    }

    this.fcmToken = localStorage.getItem('fcmToken')
    if (this.fcmToken != null) {
      this.setPushNotificationToken()
    }

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
    },
    async addListeners() {
      await PushNotifications.addListener('registration', token => {
        console.log('FCM Token', token.value)
        localStorage.setItem('fcmToken', token.value)
      });

      await PushNotifications.addListener('registrationError', err => {
        alert('registration error!')
        console.log('Registration error: ', err.error);
      });
    },

    async registerNotifications () {
      this.addListeners()
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.log('User denied permissionsss!')
        alert("permision denied!")
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    },
    async setPushNotificationToken() {
      const token = localStorage.getItem('token')
      try {
        
        const res = await axios.post('/users/set_fcm_token', {
          "fcm_token": this.fcmToken
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        console.log("set push notif token")
      } catch(e) {
        // For some reason, axios response has a different structure for web and for ios.
        // Still to confirm for android
        const dev = await Device.getInfo()
        if (dev.platform == 'ios') {
          if (e.status != 200) {
            this.error_message = e.data.message
          }
        } else if (dev.platform == 'web') {
          if (e.response.status != 200) {
            this.error_message = e.response.data.message
          }
        } else {
          if (e.response.status != 200) {
            this.error_message = e.response.data.message
          }
        }
        console.log(e)
      }
    },
    // async sendNotification() {
    //   const token = localStorage.getItem('token')

    //   const r = await axios.get('/users/send_notif',
    //   {
    //     headers: {
    //       Authorization: 'Bearer ' + token
    //     }
    //   })

    // }
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
  font-size: 70px;
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