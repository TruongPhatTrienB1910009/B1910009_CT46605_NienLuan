<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>ĐIỀN THÔNG TIN ĐẶT BÀN</h3>
                </div>

                <div class="modal-body">
                    <div class="infoBooking row">
                        <span class="col-sm-4">HỌ TÊN:</span>
                        <input placeholder="Họ tên của bạn" class="col-sm-8" type="text" v-model="reser.name">
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">NGÀY ĐẶT:</span>
                        <input disabled class="col-sm-8" type="date" v-model="reser.dateBooking">
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">GIỜ ĐẶT:</span>
                        <div class="col-sm-8 p-0">
                            <input type="time" v-model="reser.timeBooking">
                        </div>
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">SỐ NGƯỜI:</span>
                        <input placeholder="Số người tối thiểu là 1" class="col-sm-8" min="1" type="number"
                            v-model="reser.seat">
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">ĐIỆN THOẠI:</span>
                        <input placeholder="Số điện thoại của bạn" class="col-sm-8" type="text" v-model="reser.phone">
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">GHI CHÚ:</span>
                        <textarea placeholder="Ghi chú cho nhà hàng" class="col-sm-8" name="" id="" cols="30" rows="5"
                            v-model="reser.note"></textarea>
                    </div>
                </div>

                <div class="modal-footer">

                    <button class="modal-default-button btn btn-danger" @click="closeModal">
                        HỦY
                    </button>
                    <button class="modal-default-button btn btn-warning" @click="reset">
                        RESET
                    </button>
                    <button class="modal-default-button btn btn-info" @click="createReser">
                        ĐẶT BÀN
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import reservationService from '../services/reservation.service'
export default {
    emits: ['close'],
    props: ['temp'],
    setup(props, { emit }) {
        const authStore = useAuthStore();
        const reser = reactive({
            name: null,
            phone: null,
            dateBooking: props.temp.dateBooking,
            timeBooking: null,
            seat: null,
            note: null,
            tableID: props.temp.tableID,
            userID: authStore.userID
        })


        async function createReser() {
            try {
                await reservationService.createReservation(reser);
                alert("ĐẶT BÀN THÀNH CÔNG");
                closeModal();
            } catch (error) {
                console.log(error);
            }
        }

        function reset() {
            reser.name = null,
                reser.phone = null,
                reser.dateBooking = props.temp.dateBooking,
                reser.timeBooking = null,
                reser.seat = null,
                reser.note = null,
                reser.tableID = props.tableID,
                reser.userID = authStore.userID
        }

        function closeModal() {
            emit('close');
        }

        return { closeModal, reser, createReser, reset }
    }
}
</script>

<style scoped>
.infoBooking {
    margin: 10px;
}

.infoBooking input {
    line-height: 30px;
    outline: none;
}

.infoBooking input:focus {
    outline: red;
}

.infoBooking span {
    margin-top: 8px;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>