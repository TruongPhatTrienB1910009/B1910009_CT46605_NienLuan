<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import { useCookies } from "vue3-cookies";
import navBar from "./components/navHeader.vue";
const x = screen.availHeight - 175;
const authStore = useAuthStore();
const { cookies } = useCookies();

onMounted(() => {
    const jwt = cookies.get("jwt");
    if (jwt !== null) {
        authStore.setState();
    }
})


</script>

<template>
    <navBar />
    <main id="mainScreen" :style="{ height: x + 'px' }">
        <router-view />
    </main>
</template>

<style scoped>
#mainScreen {
    margin-top: 70px;
}
</style>
