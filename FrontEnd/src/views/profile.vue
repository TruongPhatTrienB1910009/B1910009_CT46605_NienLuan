<template>
    <div class="profile__container">
        <div class="wrapper">
            <div class="left">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvts5aHBstDkR8PigS4RmZkbZy78zpZoSuOw&usqp=CAU"
                    alt="">
                <!-- <h4>NAME</h4> -->
                <button class="btn btn-info">ĐĂNG XUẤT</button>
            </div>
            <div class="right">
                <div class="info">
                    <h3>THÔNG TIN VỀ BẠN</h3>
                    <div class="info__data">
                        <div class="data">
                            <h4>Email</h4>
                            <p>hi@gmail.com</p>
                        </div>
                        <div class="data">
                            <h4>Phone</h4>
                            <p>0787899778</p>
                        </div>
                    </div>
                </div>

                <div class="Tables">
                    <h3>THÔNG TIN ĐẶT BÀN</h3>
                    <n-scrollbar style="max-height: 120px">

                    </n-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import profileCard from '../components/profileCard.vue';
import userService from '../services/user.service';
import { useAuthStore } from '../stores/auth';
import { reactive, onBeforeMount, ref } from 'vue';
import { Collapse } from 'vue-collapsed';
export default {
    components: { profileCard, Collapse },
    setup() {
        const authStore = useAuthStore();
        const isExpanded = ref(false)


        async function logout() {
            await userService.logOut();
            authStore.logOut();
        }

        const document = reactive({ 'user': '' })

        async function GetUser() {
            document.user = await userService.getUser(authStore.userID);
        }

        onBeforeMount(() => {
            GetUser();
        })

        return {
            logout, document, isExpanded
        }
    }
}
</script>

<style scoped>
.my-class {
    transition: height 300ms cubic-bezier(0.3, 0, 0.6, 1);
}

.profile__container {
    height: 100vh;
    position: relative;
}

.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 860px;
    min-height: 400px;
    display: flex;
    box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
}

.wrapper .left {
    width: 35%;
    background: linear-gradient(to right, #5a4444, #8a6d6d);
    padding: 30px 25px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-align: center;
    color: #fff;
}

.wrapper img {
    margin-bottom: 10px;
    border-radius: 5px;
}

.wrapper .left btn {
    margin-bottom: 10px;
}

.wrapper .right {
    width: 65%;
    background: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 30px 25px;
}

.wrapper .right .Tables,
.wrapper .right .info {
    margin-bottom: 20px;

}

.wrapper .right .Tables h3,
.wrapper .right .info h3 {
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e0e0e0;
    color: #353c4e;
    text-transform: uppercase;
    letter-spacing: 5px;
}

.wrapper .right .info__data {
    display: flex;
    justify-content: space-between;
}

.wrapper .right .info__data .data {
    width: 45%;
}

.wrapper .right .info__data .data h4 {
    color: #353c4e;
    margin-bottom: 5px;
}

.wrapper .right .info__data .data p {
    font-size: 13px;
    margin-bottom: 10px;
    color: #919aa3;
}

.profile__container-info {
    margin-top: 110px;
}
</style>