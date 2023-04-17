<template>
    <div class="Booking__table">
        <div class="booking__table-info">
            <form>
                <h3 v-if="authStore.isLogin">DANH SÁCH BÀN TRỐNG</h3>
                <h4 class="mt-2" v-else>VUI LÒNG ĐĂNG NHẬP TRƯỚC KHI ĐẶT BÀN</h4>
                <table class="table">
                    <tbody>
                        <tr>
                            <td colspan="2">CHỌN NGÀY:</td>
                            <td colspan="2"><input type="date" v-model="initTable.dateBooking"></td>

                        </tr>
                        <tr>
                            <td colspan="2">VỊ TRÍ:</td>
                            <td colspan="1">
                                <div class="radioCheck">
                                    <label for="outside">Outside</label>
                                    <input type="radio" name="place" id="outside" value="outside" v-model="initTable.place">
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="radioCheck">
                                    <label for="inside">Inside</label>
                                    <input type="radio" name="place" id="inside" value="inside" v-model="initTable.place">
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td colspan="2">SỐ CHỖ NGỒI:</td>
                            <td colspan="2"><input type="number" min="1" v-model="initTable.seat"></td>
                        </tr>
                        <tr>
                            <td colspan="2">TRẠNG THÁI</td>
                            <td colspan="2">
                                <span>TRỐNG</span>
                            </td>
                        </tr>
                        <tr>
                            <td><button @click.prevent="getfilterTable" type="submit" class="btn btn-info">TÌM BÀN</button>
                            </td>
                            <td><button @click.prevent="getreset" class="btn btn-warning">RESET</button></td>
                            <td>
                                <div v-if="loading" class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="tableFilter">
            <h3>KẾT QUẢ</h3>
            <div class="scroll">
                <n-scrollbar style="max-height: 380px">
                    <div v-for="table, index in filter" :key="index" class="cardTable">
                        <n-collapse>
                            <n-collapse-item :title="table.name" class="cardTableItem">
                                <div class="cardInfo">
                                    <div class="row">
                                        <p class="col-sm-6">Tên bàn: {{ table.name }}</p>
                                        <p class="col-sm-6">Số chỗ ngồi: {{ table.seat }}</p>
                                    </div>
                                    <div class="row">
                                        <p class="col-sm-6">Vị trí: {{ table.place }}</p>
                                        <p class="col-sm-6"></p>
                                    </div>
                                    <button v-if="authStore.isLogin && authStore.role == 'guest'" class="btn btn-info"
                                        id="show-modal" @click="showModalBooking(index)">ĐẶT
                                        BÀN</button>
                                    <div>
                                        <button class="btn">Xóa</button>
                                        <button class="btn">Chỉnh sửa</button>
                                    </div>
                                </div>
                                <transition name="modal">
                                    <modal-booking v-if="showModal" @close="closeModal" :temp="temp" />
                                </transition>
                            </n-collapse-item>
                        </n-collapse>
                    </div>
                </n-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import modalBooking from '../components/booking.vue';
import tableService from '../services/table.service';
export default {
    components: { modalBooking },
    setup(props, { emit }) {
        const showModal = ref(false);
        const filter = ref([]);
        const Tables = ref([]);
        const loading = ref(false);
        const authStore = useAuthStore();
        const temp = reactive({
            table: null,
            dateBooking: new Date(Date.now()).toISOString().slice(0, 10)
        });

        const initTable = reactive({
            dateBooking: new Date(Date.now()).toISOString().slice(0, 10),
            seat: 1,
            place: null
        })

        async function getAllTables() {
            Tables.value = (await tableService.getAllTables()).tables;
            filter.value = Tables.value;
            filterTable();
        }

        function filterTable() {
            new Promise(function (resolve, reject) {
                const filterData = ref([]);
                filterData.value = Tables.value;
                if (initTable.seat !== 1) {
                    filterData.value = Tables.value.filter((table) => table.seat >= initTable.seat);
                    filter.value = filterData.value;
                }
                resolve(filterData);
            })
                .then(function (res) {
                    const filterData = ref([]);
                    filterData.value = res.value;
                    if (initTable.place !== null) {
                        filterData.value = res.value.filter((table) => table.place === initTable.place);
                        filter.value = filterData.value;
                    }
                    return filterData;
                })
                .then(function (res) {
                    res.value.forEach((table) => {
                        const result = table.reservations.find((reser) => {
                            return reser.dateBooking === initTable.dateBooking;
                        })

                        console.log(result)

                        if (result != undefined) {
                            table.isBooked = true;
                        } else {
                            table.isBooked = false;
                        }
                    })

                    filter.value = res.value.filter((table) => table.isBooked === false);
                    loading.value = false;
                })
        }

        function getfilterTable() {
            loading.value = true;
            setTimeout(filterTable, 1000);
        }

        function reset() {
            initTable.seat = 1;
            initTable.place = null;
            initTable.dateBooking = new Date(Date.now()).toISOString().slice(0, 10);
            filterTable();
        }

        function getreset() {
            loading.value = true;
            setTimeout(reset, 1000);
        }

        function showModalBooking(index) {
            console.log(filter.value[index]._id);
            temp.table = filter.value[index];
            temp.dateBooking = initTable.dateBooking;
            showModal.value = true;
        }

        function closeModal() {
            showModal.value = false;
            getAllTables();
        }

        onBeforeMount(() => {
            getAllTables();
        })


        return {
            initTable, filter, showModal, showModalBooking, closeModal, getfilterTable, getreset, loading, temp, authStore
        }
    }
}
</script>

<style scoped>
.Booking__table {
    width: 100%;
    min-height: 98%;
    background-color: #ffffff;
    margin: -10px 10px -10px 0;
    border-radius: 10px;
    border: 3px solid #ccc;
}

.radioCheck {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.scroll {
    border: 2px solid #ccc;
    width: 96%;
    margin: 0 auto;
}

.cardTable {
    width: 100%;
    min-height: 50px;
    border: 1px solid #ccc;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cardTable:hover {
    background-color: aqua;
}

.cardTableItem .cardInfo {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
}

.cardInfo {
    padding: 10px;
}


.cardTableItem .cardInfo button {
    padding: 10px;
    background-color: blue;
    margin: 0 20px 0 0;
    min-width: 100px;
}
</style>