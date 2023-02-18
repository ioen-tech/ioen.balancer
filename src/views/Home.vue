.<template>
  <h3 v-if="this.$store.getters.isLoggedIn"> Hello {{ this.$store.state.user.username }}</h3>
  <h3 v-if="!this.$store.getters.isLoggedIn">You are Not Logged In</h3>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  async created() {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      this.$store.commit('setUser', res.data)
    } catch {
      this.$router.push('/login')
    }


  }
}
</script>

<style>

</style>