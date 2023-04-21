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

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueSplide)
app.use(vuetify)
app.use(naive)
app.mount('#app')

