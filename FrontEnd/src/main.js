import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from './router/index';
import store from './store';

createApp(App).use(router).use(store).mount('#app')
