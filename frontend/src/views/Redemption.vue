.<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="header d-flex justify-content-around">
          <div class="mt-2 d-flex flex-column">
            <img src="https://robohash.org/mail@ashallendesign.co.uk" class="img-thumbnail" alt="Avatar" style="width: 100px; height: 100px;">
            <h5>Avatar</h5>
          </div>
          <div class="mt-2 align-self-center">
            <div class="ioen">{{ ioenBalance }}</div>
            <h3>I O E N</h3>
          </div>
        </div>
        <hr>
        <div>
          <h3>My Collections</h3>
          <div class="d-flex justify-content-center flex-wrap">
            <div v-if="!collections.length">No collections</div>
              <div v-for="collection in collections" class="collections d-flex p-2">
                <img :src="require(`../assets/img/${collection.items}`)" class="img-thumbnail" >
              </div>
          </div>
        </div>
        <hr>
        <div>
          <h3>Store</h3>
          <div class="d-flex flex-column">
            <div v-if="!stores.length">There are no items to display</div>
            <div v-for="store in stores" class="d-flex justify-content-between">
              <div class="d-flex w-100">
                <div class="align-self-center p-2 storeImg"><img class="img-thumbnail" :src="require(`../assets/img/${store.items}`)"></div>
                <div class="align-self-center w-50 p-2">{{ store.description }}</div>
                <div class="align-self-center p-2 mt-2"><h2>{{ $filters.abbrFormat(store.item_price) }}</h2></div>
              </div>
              <div>
                <div class="align-self-center p-2 mt-1"><button class="btn btn-secondary" @click="buy(store.store_id, store.description)">Get</button></div>
              </div>
              </div>
          </div>
          <p class="errorMessage">{{ error_message }}</p>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment-timezone'
import {Device} from '@capacitor/device'

export default {
  data() {
    return {
      collections: [],
      stores: [],
      number: 110000,
      ioenBalance: 0,
      error_message: '',
    }
  },
  name: 'Redemption',
  created() {
    // Get the logged in user
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const group = JSON.parse(localStorage.getItem('groupInfo'))

    if (user) {
      this.ioenBalance = user.rewards_points
    }

    // Get Collections Info
    this.$store.dispatch('getMyCollections').then((collections) => {
      this.collections = collections.data.slice()
    }).catch((err) => {
      console.log(err)
      // this.$router.push('/login')
    })

    // get Store Info
    this.$store.dispatch('getStores').then((stores) => {
      this.stores = stores.data.slice()
    }).catch((err) => {
      console.log(err)
    })


  },
  methods: {
    async buy(id, desc) {

      // alert(`${this.$store.state.user.username}:${this.$store.state.user.user_id} bought this: ${id}:${price}`)
      const token = localStorage.getItem('token')

      try {
        const res = await axios.post('/users/buy', {
          "user_id": this.$store.state.user.user_id,
          "store_id": id
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        alert(`You have succesfully buy the ${desc}`)
        this.$router.go()
      } catch(e) {
        // For some reason, axios response has a different structure for web and for ios.
        // Still to confirm for android
        const dev = await Device.getInfo()
        if (dev.platform == 'ios') {
          if (e.status != 200) {
            this.error_message = 'Incorrect username and/or password!'
          }
        } else if (dev.platform == 'web') {
          if (e.response.status != 200) {
            console.log("status is not 2000")
            this.error_message = e.response.data.message
          }
        } else {
          if (e.response.status != 200) {
            console.log("Status is not 200 android")
            this.error_message = e.response.data.message
          }
        }
        console.log(e)
      }
      
    }
  }
}
</script>

<style scoped>
.collections img{
  height: 100px;
  width: 100px;
}

.storeImg {
  height: 60px;
  width: 60px;
}

.ioen {
  font-size: 40px;
  font-weight: bold;
}
.errorMessage {
  color: red
}
</style>