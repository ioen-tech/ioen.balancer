.<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="header d-flex justify-content-between">
          <div class="mt-2">
            <div class="ioen">10,000</div>
            IOEN Balance
          </div>
          <div class="cash align-self-center">
            <button type="button" class="btn btn-primary">Redeem for Cash</button>
          </div>
        </div>
        <hr>
        <div>
          <h3>My Collections</h3>
          <div class="collections d-flex justify-content-between">
            <div>
              <img class="img-thumbnail" src="@/assets/img/House.png">
            </div>
            <div>
              <img class="img-thumbnail" src="@/assets/img/ElectricCarRed.png">
            </div>
            <div>
              <img class="img-thumbnail" src="@/assets/img/RedGridLogo.png">
            </div>
          </div>
          <div class="collections d-flex justify-content-between mt-4">
            <div>
              <img class="img-thumbnail" src="@/assets/img/LightningFill.png">
            </div>
            <div>
              <img class="img-thumbnail" src="@/assets/img/redgrid-logo.gif">
            </div>
            <div>
              <img class="img-thumbnail" src="@/assets/img/TownhouseIconRedLinear.png">
            </div>
          </div>
        </div>
        <hr>
        <div>
          <h3>Store</h3>
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex w-100">
                <div class="p-2 storeImg"><img class="img-thumbnail" src="@/assets/img/MoreInfo.png"></div>
                <div class="align-self-center w-50 p-2">IOENite Platinum NFT</div>
                <div class="align-self-center p-2"><h2>100k</h2></div>
              </div>
              <div>
                <div class="align-self-center p-2"><button class="btn btn-secondary">Get</button></div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex w-100">
                <div class="p-2 storeImg"><img class="img-thumbnail" src="@/assets/img/WaterDropIconRedLinear.png"></div>
                <div class="align-self-center w-50 p-2">Macedon IOENite Platinum NFT</div>
                <div class="align-self-center p-2"><h2>50k</h2></div>
              </div>
              <div>
                <div class="align-self-center p-2"><button class="btn btn-secondary">Get</button></div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex w-100">
                <div class="p-2 storeImg"><img class="img-thumbnail" src="@/assets/img/SunIconRedLinear.png"></div>
                <div class="align-self-center w-50 p-2">Macedon FCC Membership Discount</div>
                <div class="align-self-center p-2"><h2>25k</h2></div>
              </div>
              <div>
                <div class="align-self-center p-2"><button class="btn btn-secondary">Get</button></div>
              </div>
            </div>
          </div>
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
    }).catch((err) => {
      console.log(err)
      // this.$router.push('/login')
    })


  },
  methods: {
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

</style>