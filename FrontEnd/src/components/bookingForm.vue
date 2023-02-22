<template>
    <div class="mainContainer row">
        <div class="formReser col-sm-6">
            <form @submit.prevent="getLocalReser">
                <h4 class="text-center">VUI LÒNG ĐIỀN THÔNG TIN CỦA BẠN</h4>
                <div class="form-group">
                    <label for="name">Tên của bạn:</label>
                    <input type="text" class="form-control" id="name" placeholder="Họ và tên" name="name"
                        v-model="reser.name">
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại:</label>
                    <input type="text" class="form-control" id="phone" placeholder="Số điện thoại" name="phone"
                        v-model="reser.phone">
                </div>
                <div class="form-group">
                    <label for="meeting-time">Thời gian đặt bàn:</label>
                    <input class="form-control" type="datetime-local" id="meeting-time" name="dateBooking"
                        v-model="reser.dateBooking">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Ghi Chú:</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="note"
                        v-model="reser.note"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="tableInfo col-sm-6">
            <h1>THONG TIN BAN</h1>
            {{ dataTable.value._id }}
            <p>{{ dataTable.value.name }}</p>
            <p>{{ dataTable.value.seat }}</p>
            <p>{{ dataTable.value.place }}</p>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
export default {
    props: ['table'],
    emits: ['createReser'],
    setup(props, { emit }) {
        const dataTable = reactive(props.table);
        console.log(dataTable.value);
        const authStore = useAuthStore();
        const reser = reactive({
            name: '',
            phone: '',
            dateBooking: '',
            note: '',
            user: authStore.getUserID,
            table: ''
        })

        function getLocalReser() {
            emit('createReser', reser);
        }

        return { dataTable, reser, getLocalReser }
    }
}
</script>

<style scoped>
.tableInfo {
    text-align: center;
}
</style>