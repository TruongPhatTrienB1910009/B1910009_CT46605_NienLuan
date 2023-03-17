<template>
    <FormLogin @submit:user="signIn" />
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
        const authStore = useAuthStore();

        async function signIn(userData) {
            const user = {
                email: userData.email,
                password: userData.password
            }
            console.log(user);
            try {
                const res = await userService.signIn(user);
                authStore.setUser(res._id);
                router.push({ name: 'Home' });
            } catch (err) {
                console.log(err);
            }
        }

        return { signIn }
    }
}
</script>