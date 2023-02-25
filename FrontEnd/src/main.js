import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
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


createApp(App).use(router).use(createPinia()).use(VueSplide).mount('#app')
