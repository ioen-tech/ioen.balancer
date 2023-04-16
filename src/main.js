import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./axios"
import 'bootstrap/dist/css/bootstrap.css'
import * as mdijs from '@mdi/js'
import mdiVue from 'mdi-vue/v3'

const app = createApp(App)

const rootComponent = app.use(store).use(router).use(mdiVue, {icons: mdijs}).mount("#app");

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