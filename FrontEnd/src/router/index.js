import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Profile from '../views/profile.vue';
import OverviewTable from '../views/overviewTables.vue';

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/table",
        name: "OverviewTable",
        component: OverviewTable,
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
        path: "/user/profile",
        name: "Profile",
        component: Profile,
        props: true
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
