import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Booking from '../views/booking.vue';

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/user/signin",
        name: "Login",
        component: Login,
    },
    {
        path: "/user/register",
        name: "Register",
        component: Register,
    },

    {
        path: "/table/:id",
        name: "Booking",
        component: Booking,
        props: true
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
