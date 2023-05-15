import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./axios";
import "bootstrap/dist/css/bootstrap.css";
import * as mdijs from "@mdi/js";
import mdiVue from "mdi-vue/v3";
import Socketio from "@/plugins/Socket.io";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faChargingStation, faBitcoinSign, faSolarPanel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChargingStation, faBitcoinSign, faSolarPanel)

const app = createApp(App);

const rootComponent = app
  .use(store)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Socketio, {
    connection: "http://localhost:3000",
    options: {},
  })
  .mount("#app");

app.config.globalProperties.$filters = {
  abbrFormat(value) {
    if (String(value).length < 7) {
      return Math.floor(value / 1000) + "K";
    } else {
      return Math.floor(value / 1000000) + "M";
    }
  },
};

import "bootstrap/dist/js/bootstrap.js";
