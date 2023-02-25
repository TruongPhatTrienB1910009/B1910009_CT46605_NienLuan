<template>
    <div class="mainContain container">
        <div class="contain" :class="{ 'containRegister': url === 'register' }">
            <div class="divform">
                <h1 v-if="url !== 'register'">ĐĂNG NHẬP</h1>
                <h1 v-else>ĐĂNG KÝ</h1>
                <hr>
                <form @submit.prevent="getUser">
                    <div class="divContain">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="emai" placeholder="Nhập vào email của bạn" v-model="user.email">
                    </div>
                    <div class="divContain">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Nhập mật khẩu" v-model="user.password">
                    </div>
                    <div v-if="url === 'register'" class="divContain">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Xác nhận mật khẩu" v-model="user.confirm">
                    </div>
                    <p v-if="url !== 'register'">Bạn chưa có mật khẩu <router-link :to="{ name: 'Register' }">Đăng
                            ký</router-link>
                    </p>
                    <p v-else>Bạn đã có mật khẩu <router-link :to="{ name: 'Login' }">Đăng
                            nhập</router-link>
                    </p>
                    <button v-if="url !== 'register'" class="btnCss" type="submit">ĐĂNG NHẬP</button>
                    <button v-else class="btnCss" type="submit">ĐĂNG KÝ</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
export default {
    emits: ['submit:user'],
    props: ['url'],
    setup(props, ctx) {
        const user = reactive({
            email: '',
            password: '',
            confirm: '',
        })

        const url = props.url;
        function getUser() {
            ctx.emit('submit:user', user);
        }

        return { user, getUser, url }
    }
}
</script>

<style scoped>
.contain {
    margin-top: 160px;
    margin-bottom: 140px;
    height: 400px;
    width: 480px;
    margin-left: auto;
    margin-right: auto;
    background-color: aqua;
    border-radius: 10px;
    padding: 20px;
}

.containRegister {
    margin-top: 130px;
    height: 460px;
    margin-bottom: 110px;
}

.divform h1 {
    text-align: center;
    padding-top: 10px;
    font-weight: 700;
}

form {
    text-align: center;
}

.divContain {
    line-height: 30px;
    margin: 25px auto;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    width: 360px;
}

.divContain i {
    color: aqua;
}


.divContain input {
    width: 320px;
    border: none;
    border-radius: 10px;
    padding: 5px;
    margin: 5px 0;
}

input:focus {
    outline: none;
}

.btnCss {
    width: 260px;
    height: 50px;
    border-radius: 50px;
    border: 0;
}
</style>