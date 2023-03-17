import { defineStore } from 'pinia';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import userService from '../services/user.service';
import { useRouter } from 'vue-router';
export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLogin: false,
            userID: '',
            role: 'guest',
            router: useRouter()
        }
    },

    getters: {
        getUserID() {
            return this.userID;
        }
    },

    actions: {
        setUser(UID) {
            this.isLogin = true;
            localStorage.setItem('userID', UID);
            this.userID = UID;
            this.checkUser();
        },

        async checkUser() {
            let user = localStorage.getItem('userID');
            const jwt = cookies.get("jwt");
            if (user != null && jwt != null) {
                const getUser = await userService.getUser(user);
                this.isLogin = true;
                this.userID = user;
                if (getUser.role === 'admin') {
                    this.role = 'admin';
                }
            }

            if (this.role === 'admin') {
                this.router.push({ name: 'Admin' })
            }
            console.log(this.role)

        },

        logOut() {
            this.isLogin = false;
            this.userID = '';
            localStorage.removeItem('userID');
        }
    }
})