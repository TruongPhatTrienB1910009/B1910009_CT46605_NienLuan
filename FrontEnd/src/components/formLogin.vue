<template>
    <div class="Conatain">
        <div class="divForm">
            <Form :validation-schema="loginFormSchema">
                <div class="div-input" :class="[(url != 'register') ? 'div-input-login' : '']">
                    <div class="divField">
                        <Field name="email" placeholder="Email" type="text" v-model="user.email" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="divField">
                        <Field name="password" placeholder="Mật khẩu" type="password" v-model="user.password" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="divField" v-if="url == 'register'">
                        <Field name="confirm" placeholder="Xác nhận lại mật khẩu" type="password" v-model="user.confirm" />
                        <ErrorMessage name="confirm" class="error-feedback" />
                    </div>
                </div>
                <div v-if="url == 'register'" class="div-button">
                    <p>Bạn đã có mật khẩu. <router-link :to='{ name: "Login" }'>Đăng nhập ngay?</router-link></p>
                    <button @click.prevent="getUser" type="submit">ĐĂNG KÝ</button>
                </div>
                <div v-else class="div-button">
                    <p>Bạn chưa có mật khẩu. <router-link :to='{ name: "Register" }'>Đăng ký ngay?</router-link></p>
                    <button @click.prevent="getUser" type="submit">ĐĂNG NHẬP</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
    emits: ['submit:user'],
    props: ['url'],
    components: { Field, Form, ErrorMessage },
    setup(props, ctx) {

        const loginFormSchema = yup.object().shape({
            email: yup.string().required("Email không được để trống").email("Email không đúng"),
            password: yup.string().required("Mật khẩu không được để trống").min(6, "Mật khẩu tối thiểu là 6 ký tự"),
            confirm: yup.string().required("Vui lòng xác nhận mật khẩu").min(6, "Mật khẩu tối thiểu là 6 ký tự")
        });

        const user = reactive({
            email: '',
            password: '',
            confirm: '',
        })

        const url = props.url;
        function getUser() {
            ctx.emit('submit:user', user);
        }

        return { user, getUser, url, loginFormSchema }
    }
}
</script>

<style scoped>
.Conatain {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(https://popmenucloud.com/gjlhrpie/1d984609-c1c1-461a-9fdb-8587ee72aa32);
}

.divForm {
    width: 540px;
    min-height: 380px;
    margin-top: 80px;
    background-color: black;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
}

form {
    min-height: 320px;
    width: 80%;
    color: white;
}

form input {
    width: 100%;
    line-height: 45px;
    font-size: 20px;
    padding: 0 5px;
    margin-bottom: 5px;
    background-color: transparent;
    color: white;
    border: 2px solid brown;
}

.divField {
    margin-bottom: 25px;
}

.div-button p {
    text-align: center;
}

.div-button button {
    width: 100%;
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
    color: white;
    background-color: transparent;
    border: 2px solid brown;
}

.div-button button:hover {
    background-color: brown;
}

.div-input-login {
    margin-top: 30px !important;
}

.error-feedback {
    color: white;
    font-size: 16px;
    margin: 10px 0;
}
</style>