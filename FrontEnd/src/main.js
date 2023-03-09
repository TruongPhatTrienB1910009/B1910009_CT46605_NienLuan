import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import router from './router/index';
import { createPinia } from 'pinia';
import VueSplide from '@splidejs/vue-splide';
import { globalCookiesConfig } from "vue3-cookies";
globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

import naive from 'naive-ui';

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueSplide)
app.use(naive)
app.mount('#app')

