import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLogin: false,
        }
    },

    actions: {
        setState() {
            this.isLogin = true;
        },

        logOut() {
            this.isLogin = false;
        }
    }
})