<template>
    <FormLogin :url="url" @submit:user="register" />
</template>

<script>
import FormLogin from '../components/formLogin.vue';
import userService from '../services/user.service';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
    components: { FormLogin },
    setup() {
        const router = useRouter();
        const url = 'register';
        const authStore = useAuthStore();
        async function register(userData) {
            const user = {
                email: userData.email,
                password: userData.password,
                confirm: userData.confirm
            }
            try {
                const res = await userService.register(user);
                authStore.setUser(res._id);
                console.log(user);
                router.push({ name: 'Home' });.
            } catch (err) {
    console.log(err.response.data.message);
}
        }

return { register, url }
    }
}
</script>