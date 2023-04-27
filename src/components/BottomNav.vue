<template>
  <div class="mobile-nav">
    <div class="bloc-icon w-100">
      <router-link to="/home"  class="icon w-100 p-3">
        <mdicon name="monitor-dashboard" size="35px" />
      </router-link>
      
    </div>
    <div class="bloc-icon w-100">
      <router-link to="/redemption" class="icon w-100 p-3">
        <mdicon name="bitcoin"  size="35px"/>
      </router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  methods: {
  }
}
</script>

<style scoped>
.mobile-nav {
  background: transparent;
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.bloc-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #bbb;
  size: 40px;
  font-size: 12px;
}

a.router-link-active {
  border-top: 1px;
  color: rgba(27,163,156,0.9);
  border-top-style: solid;
  width: 100%;
}

/* @media screen and (min-width: 600px) {
  .mobile-nav {
    display: none;
  }
} */

.icon{
  color: #bbb;
}
</style>