<template>
    <FormLogin @submit:user="signIn" />
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

        async function signIn(userData) {
            const user = {
                email: userData.email,
                password: userData.password
            }
            try {
                await userService.signIn(user);
                store.dispatch('setLogIn');
                router.push({ name: 'Home' });
            } catch (err) {
                console.log(err);
            }
        }

        return { signIn }
    }
}
</script>