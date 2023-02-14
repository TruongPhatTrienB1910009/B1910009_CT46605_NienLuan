<template>
    <FormLogin :url="url" @submit:user="register" />
</template>

<script>
import FormLogin from '../components/formLogin.vue';
import userService from '../services/user.service';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    components: { FormLogin },

    setup() {
        const router = useRouter();
        const store = useStore();
        const url = 'register';
        async function register(userData) {
            const user = {
                email: userData.email,
                password: userData.password,
                confirm: userData.confirm
            }
            try {
                await userService.register(user);
                store.dispatch('setLogIn');
                router.push({ name: 'Home' });
            } catch (err) {
                console.log(err.response.data.message);
            }
        }

        return { register, url }
    }
}
</script>