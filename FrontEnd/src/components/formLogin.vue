<template>
    <div class="main">
        <div class="div-form">
            <h1>Hello!</h1>
            <form @submit.prevent="getUser">
                <div class="inp">
                    <i class="fa-regular fa-user"></i>
                    <input type="email" name="email" id="email" placeholder="Email" v-model="user.email">
                </div>
                <div class="inp">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" name="password" id="password" placeholder="Password" v-model="user.password">
                </div>
                <!-- <div class="inp">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" name="password" id="password" placeholder="Password">
                </div> -->
                <button class="btn-css" type="submit">Đăng Nhập</button>
                <span class="spn-regs">Chưa có tài khoản?
                    <router-link :to="{ name: 'Register' }">Đăng Ký</router-link>
                </span>
            </form>
        </div>
        <div class="div-text">
            <h1>Chào Mừng Bạn Đã Đến Với TTC</h1>
            <p>Chúng tôi cam kết sẽ tận tâm phục vụ và mang đến những trải nghiệm tuyệt vời cho khách hàng.</p>
        </div>
    </div>
</template>

<script>
import { reactive, defineEmits } from 'vue';
export default {
    emits: ['submit:user'],
    setup(props, ctx) {
        const user = reactive({
            email: '',
            password: ''
        })

        function getUser() {
            ctx.emit('submit:user', user);
        }

        return { user, getUser }
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    display: flex;
}

.main .div-form {
    height: 100vh;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.main .div-form h1 {
    font-size: 50px;
    margin-bottom: 50px;
}

.main .div-form form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

form .inp {
    width: 60%;
    margin: auto;
    height: 60px;
    margin-bottom: 30px;
    border-radius: 50px;
    box-shadow: 20px 20px 20px #8e1df720, -10px -10px 20px #8e1df720;
    position: relative;
}

form .inp input {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    outline: none;
    border: none;
    padding: 20px 70px;
    font-size: 18px;
}

form .inp i {
    position: absolute;
    color: #8e1df7;
    font-size: 30px;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
}

form .btn-css {
    color: #fff;
    font-size: 20px;
    width: 250px;
    margin: auto;
    background: linear-gradient(170deg, #8e1df7, #19025e);
    padding: 15px;
    border-radius: 50px;
    cursor: pointer;
    border: none;
    margin-bottom: 20px;

}

form .spn-regs {
    text-align: center;
    font-size: 14px;
}

form .spn-regs a {
    color: #8e1df7;
    text-decoration: none;
}

form .spn-regs:hover a {
    text-decoration: underline;
}

.main .div-text {
    height: 100vh;
    width: 40%;
    background: linear-gradient(170deg, #8e1df7, #19025e);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
}

.main .div-text h1 {
    color: #fff;
    font-size: 40px;
    margin-bottom: 20px;
}

.main .div-text p {
    margin: 0 auto;
    width: 60%;
    color: #f0f0f0;
    font-size: 14px;
    line-height: 2;
}
</style>