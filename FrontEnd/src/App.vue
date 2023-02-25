<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import navBar from "./components/navHeader.vue";
import footerVue from "./components/footer.vue";
const x = screen.availHeight - 175;
const authStore = useAuthStore();

onMounted(() => {
    authStore.checkUser();
});
</script>

<template>
    <navBar />
    <router-view />
    <footer-vue />
</template>

<style scoped></style>

