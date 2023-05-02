.<template>
  <main :class=bodyBackground>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <br>
        <br>

        <!-- <form role="form" @submit.prevent="handleSubmit" enctype="multipart/form-data"> -->
        <div id="info" class="d-flex justify-content-around flex-row align-items-center">
          <div class="homeInfo">
            <h3>$150</h3>
            <p>Credit</p>
            <!-- <mdicon name="view-dashboard" style="color: red;"/> -->
          </div>
          <div class="homeInfo">
            <h3 v-if="groupInfo">{{ groupInfo.group_energy }}</h3>
            <p>Group Energy</p>
          </div>
          <div class="homeInfo">
            <h3 v-if="userInfo">{{ userInfo.rewards_points }}</h3>
            <p>I O E N</p>
          </div>
        </div>
        <!-- </form> -->
        <ChartComponent v-if="isLoading" :dataSets="dataSets" :labels="labels"/>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
  </main>
</template>

<script>
import axios from 'axios';
import moment from 'moment-timezone'
import nanologo from "@/assets/img/redgrid-logo.gif";
import ChartComponent from '../components/ChartComponent.vue';

import { Capacitor } from "@capacitor/core"
import { ref } from '@vue/reactivity'
import { PushNotifications } from '@capacitor/push-notifications';
import {Device} from '@capacitor/device';

export default {
  data() {
    return {
      imgSrc: '',
      date: '',
      time: '',
      bodyBackground: 'producing',
      nanologo,
      fcmToken: null,
      dataSets: [],
      labels: [],
      isLoading: false,
      userInfo: {},
      groupInfo: {}
    }
  },
  name: 'Home',
  components: {
    ChartComponent
  },
  async mounted() {
    
    this.getChartData()

  },
  async created() {

    this.getUserInfo()
    this.groupInfo = await this.getGroupInfo()

    if (this.groupInfo != null) {
      // Update Chartdata, group and userinfo if socket data
      // is receive from the socket server.
      this.$socket.on(this.groupInfo.group_name, (energy) => {

        this.getChartData()
        // Get the updated user info
        this.$store.dispatch('getLoggedInUser').then((res) => {
          this.$store.commit('setUser', res.data)
          this.userInfo = res.data
        })
        // Get Group Info
        this.$store.dispatch('getGroupInfo').then((group) => {
          this.$store.commit('setGroup', group.data)
          this.groupInfo = group.data
          this.updateBackground(this.groupInfo.group_energy)
        })

      })
    }
    // Get the background info from localStorage.
    const localBg = localStorage.getItem('background')
    if (localBg) {
      this.bodyBackground = localBg
    }

    // web does not support PushNotification plugins.  This checking will remove the warning in the logs.
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    // Send a notification request only for mobile app.
    if (isPushNotificationsAvailable) {
      this.registerNotifications()
    } else {
    }

    this.fcmToken = localStorage.getItem('fcmToken')
    if (this.fcmToken != null) {
      this.setPushNotificationToken()
    }

  },
  methods: {
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    async getGroupInfo() {
      if (JSON.parse(localStorage.getItem("groupInfo")) != null) {
        return (JSON.parse(localStorage.getItem('groupInfo')))
      }
      const g = await this.$store.dispatch('getGroupInfo')
      return (g.data)

    },
    async getChartData() {
      this.$store.dispatch('getEnergyLogs').then((logs) => {
      const energyLogs = logs.data

      // Formulate the labels and the datasets for rendering the Line Chart.
      this.labels = energyLogs.map(el => {
        const hour = moment.unix(el.event_time).tz('Australia/Victoria').hour()
        const minute = moment.unix(el.event_time).tz('Australia/Victoria').minute()
        return (((hour) + (minute/60)).toFixed(10))
      })
      this.dataSets = energyLogs.map(el => el.energy)

      // this.labels = [...Array(288)].map(_=> Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1))
      // this.dataSets = [...Array(288)].map(_=> Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1))
      this.isLoading = true
      })
    },
    async updateBackground(energy) {
      // For now the balanced range is within -500 to 500w.
      if (energy > -500 && energy < 500) {
        this.bodyBackground = 'balanced'
      } else if (energy < -500) {
        this.bodyBackground = 'producing'
      } else {
        this.bodyBackground = 'consuming'
      }
      localStorage.setItem('background', this.bodyBackground)
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

#info {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
#info .time {
  letter-spacing: 0.05em;
  font-size: 70px;
  padding: 0;
}
#info .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
#info .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}

</style>