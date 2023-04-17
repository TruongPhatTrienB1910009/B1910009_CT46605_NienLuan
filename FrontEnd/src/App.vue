<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "./stores/auth";
import navBar from "./components/navHeader.vue";
import footerVue from "./components/footer.vue";
const authStore = useAuthStore();

onBeforeMount(() => {
    authStore.checkUser();
});
</script>

<template>
    <navBar />
    <router-view />
    <footer-vue />
    <n-notification-provider>
        <content />
    </n-notification-provider>
</template>

<style scoped></style>

