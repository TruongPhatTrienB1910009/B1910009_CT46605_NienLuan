<template>
    <FormLogin @submit:user="signIn" />
</template>

<script>
import FormLogin from '../components/formLogin.vue';
import userService from '../services/user.service';
import { useRouter, useRoute } from 'vue-router';
export default {
    components: { FormLogin },

    setup() {
        const router = useRouter();

        async function signIn(userData) {
            const user = {
                email: userData.email,
                password: userData.password
            }
            try {
                const token = await userService.signIn(user);
                router.push({ name: 'Home' });
            } catch (err) {
                console.log(err);
            }
        }

        return { signIn }
    }
}
</script>