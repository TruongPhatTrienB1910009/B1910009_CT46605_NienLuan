<template>
    <header>
        <div id="logo"><img class="seafood"
                src="https://www.hoteljob.vn/uploads/images/2021/12/09-10/logoc%C3%A1cbrand_Ussina.png" alt=""></div>
        <nav id="navBar">
            <div v-if="authStore.isLogin">
                <div class="navUser" v-if="authStore.role === 'admin'">
                    <div class="navUser__divLink">
                        <router-link :to='{ name: "Admin" }' class="router-link">THỐNG KÊ</router-link>
                    </div>
                    <div v-if="authStore.role === 'admin'" class="navUser__divLink">
                        <router-link :to='{ name: "AdminOverviewFood" }' class="router-link">MÓN ĂN</router-link>
                    </div>
                    <div v-if="authStore.role === 'admin'" class="navUser__divLink">
                        <router-link :to='{ name: "Admin" }' class="router-link">BÀN ĂN</router-link>
                    </div>
                    <div class="navUser__divLink">
                        <router-link :to='{ name: "Profile" }' class="navUser__divLink--router-link"><i
                                class="fa-solid fa-user"></i></router-link>
                    </div>
                </div>
                <div class="navUser" v-else>
                    <div class="navUser__divLink">
                        <router-link :to='{ name: "Home" }' class="router-link">Trang Chủ</router-link>
                    </div>
                    <div class="navUser__divLink">
                        <router-link :to='{ name: "Profile" }' class="navUser__divLink--router-link"><i
                                class="fa-solid fa-user"></i></router-link>
                    </div>
                </div>
            </div>
            <ul v-else>
                <li class="">
                    <router-link :to='{ name: "Home" }' class="router-link">Trang Chủ</router-link>
                </li>
                <li class="">
                    <router-link :to='{ name: "Register" }' class="router-link">Đăng Ký</router-link>
                </li>
                <li class="">
                    <router-link :to='{ name: "Login" }' class="router-link">Đăng Nhập</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { onBeforeMount } from 'vue';
export default {
    setup() {
        const authStore = useAuthStore();
        return {
            authStore
        }
    }
}
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    height: 110px;
}

#logo img {
    max-height: 60px;
}

.navUser {
    display: flex;
}

#navBar ul {
    list-style: none;
}

#navBar ul li {
    position: relative;
    float: left;
}

.navUser__divLink--router-link,
.navUser .navUser__divLink .router-link,
#navBar ul li .router-link {
    font-size: 16px;
    font-weight: 600;
    padding: 20px;
    color: #ffffff;
    display: block;
    text-decoration: none;
    text-transform: uppercase;
}

.navUser .navUser__divLink .router-link:hover,
#navBar ul li .router-link:hover {
    background: #333;
    color: #fff;
}
</style>