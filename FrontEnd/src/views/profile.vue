<template>
    <div class="profile__container">
        <div class="wrapper">
            <div class="left">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvts5aHBstDkR8PigS4RmZkbZy78zpZoSuOw&usqp=CAU"
                    alt="">
                <button @click="logout" class="btn btn-info">ĐĂNG XUẤT</button>
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
                    <n-scrollbar style="max-height: 270px">
                        <div v-for="reser, index in reservations" :key="index" class="cardReser">
                            <div class="title" @click="handleAccordion(index)">
                                <h4>Ngày nhận bàn: {{ reser.dateBooking }}</h4>
                            </div>
                            <Collapse :when="reser.isExpanded" class="v-collapse">
                                <div class="cardReser-group row">
                                    <div class="col-sm-6">
                                        <span>Tên người nhận: </span>
                                        <p>{{ reser.name }}</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <span>Số điện thoại: </span>
                                        <p>{{ reser.phone }}</p>
                                    </div>
                                </div>
                                <div class="cardReser-group row">
                                    <div class="col-sm-6">
                                        <span>Số chỗ ngồi: </span>
                                        <p>{{ reser.seat }}</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <span>Ghi chú: </span>
                                        <p>{{ reser.note }}</p>
                                    </div>
                                </div>
                                <div class="cardReser-group row">
                                    <div class="col-sm-6">
                                        <span>Tên bàn: </span>
                                        <p>{{ reser.table[0].name }}</p>
                                    </div>
                                    <div class="col-sm-6">
                                        <span>Giờ nhận: </span>
                                        <p>{{ reser.timeBooking }}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4>Các món đặt trước</h4>
                                    <div v-for="food, fIndex in reser.foods" :key="fIndex">
                                        <div class="row m-3">
                                            <p class="col-sm-4">{{ food.name }}</p>
                                            <p class="col-sm-4">{{ food.price }}</p>
                                            <p class="col-sm-4"><button @click="removeFood({
                                                reserID: reser._id, foodID: food._id, action: 'remove'
                                            })" class="btn btn-danger">Xóa</button></p>
                                        </div>
                                    </div>
                                    <button @click="gotoMenu(reser._id)" class="btn btn-info">Thêm món ăn</button>
                                </div>
                            </Collapse>
                        </div>
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
import { reactive, onBeforeMount, ref, onMounted } from 'vue';
import { Collapse } from 'vue-collapsed';
import reservationService from '../services/reservation.service';
import { useRouter } from 'vue-router';
export default {
    components: { profileCard, Collapse },
    setup() {
        const authStore = useAuthStore();
        const reservations = ref([]);
        const document = reactive({ 'user': '' })
        const router = useRouter();

        async function logout() {
            await userService.logOut();
            authStore.logOut();
            router.push({ name: 'Home' })
        }

        async function GetRser() {
            document.user = await userService.getUser(localStorage.getItem('userID'));
            reservations.value = await reservationService.getReservationByUserID(localStorage.getItem('userID'));
            console.log(reservations.value);
            reservations.value.forEach((reser) => {
                reser["isExpanded"] = false;
            })
        }

        async function removeFood(data) {
            await reservationService.addorremoveFood(data);
            reservations.value = await reservationService.getReservationByUserID(localStorage.getItem('userID'));
            reservations.value.forEach((reser, index) => {
                reser["isExpanded"] = false;
                if (reservations.value[index]._id == data.reserID) {
                    reservations.value[index].isExpanded = true;
                }
            })
        }

        function handleAccordion(selectedIndex) {
            reservations.value.forEach((_, index) => {
                reservations.value[index].isExpanded = index === selectedIndex ? !reservations.value[index].isExpanded : false
            })
        }

        function gotoMenu(ID) {
            router.push({ name: 'MenuPage', query: { ReserID: ID } })
        }

        onBeforeMount(() => {
            if (!authStore.isLogin) {
                router.push({ name: 'Home' })
            }
            GetRser();
        })

        return {
            logout, document, reservations, handleAccordion, gotoMenu, removeFood
        }
    }
}
</script>

<style scoped>
.cardReser {
    border: 1px solid #ccc;
}


.title {
    padding: 10px 0;
    color: rgb(232, 93, 93);
}

.title h4 {
    margin: 0;
}

.v-collapse {
    transition: height var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
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
    width: 960px;
    min-height: 550px;
    margin-top: 50px;
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