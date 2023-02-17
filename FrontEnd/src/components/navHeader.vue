<template>
    <header>
        <div id="logo">LOGO</div>
        <nav id="navBar">
            <div v-if="authStore.isLogin" class="navUser">
                <div class="navUser__divLink">
                    <router-link :to='{ name: "Home" }' class="router-link">Trang Chủ</router-link>
                </div>
                <div class="navUser__divLink">
                    <router-link :to='{ name: "Profile" }' class="navUser__divLink--router-link"><i
                            class="fa-solid fa-user"></i></router-link>
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
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    z-index: 100;
}

#logo {
    font-weight: bolder;
    font-size: 25px;
    color: #333;
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
    font-size: 20px;
    padding: 20px;
    color: #333;
    display: block;
    text-decoration: none;
}

.navUser .navUser__divLink .router-link:hover,
#navBar ul li .router-link:hover {
    background: #333;
    color: #fff;
}
</style>