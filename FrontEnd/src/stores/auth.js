import { defineStore } from 'pinia';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLogin: false,
            userID: '',
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
        },

        checkUser() {
            let user = localStorage.getItem('userID');
            const jwt = cookies.get("jwt");
            if (user !== null && jwt !== null) {
                this.isLogin = true;
                this.userID = user;
            }
        },

        logOut() {
            this.isLogin = false;
            this.userID = '';
            localStorage.removeItem('userID');
        }
    }
})