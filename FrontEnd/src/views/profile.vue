<template>
    <profileCard @logout-user="userLogout" />
</template>

<script>
import profileCard from '../components/profileCard.vue';
import userService from '../services/user.service';
import { useAuthStore } from '../stores/auth';
export default {
    components: { profileCard },
    setup() {
        const authStore = useAuthStore();
        async function userLogout() {
            await userService.logOut();
            authStore.logOut();
        }

        return {
            userLogout
        }
    }
}
</script>