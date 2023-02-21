.<template>
  <h3 v-if="this.$store.getters.isGroupAdmin">I'm a group Addmin</h3>
  <h3 v-else>I'm a normal Person</h3>
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
  },
}
</script>

<style>

</style>