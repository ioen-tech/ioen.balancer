import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./axios"
import 'bootstrap/dist/css/bootstrap.css'
import bottomNavigationVue from "bottom-navigation-vue"
import "bottom-navigation-vue/dist/style.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import 'font-awesome/scss/font-awesome.scss'

const app = createApp(App)

library.add(faUserSecret, faHouse, faGear)
const rootComponent = app.use(store).use(router).use(bottomNavigationVue).component('font-awesome-icon', FontAwesomeIcon).mount("#app");

app.config.globalProperties.$filters = {
  abbrFormat(value) {
    if (String(value).length < 7) {
        return Math.floor(value/1000) + 'K';
    } else {
        return Math.floor(value/1000000) + 'M';
    }
  }
}

import 'bootstrap/dist/js/bootstrap.js'