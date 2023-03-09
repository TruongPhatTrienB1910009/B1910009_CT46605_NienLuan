<template>
    <div class="Booking__table">
        <div class="booking__table-info">
            <form>
                <h3>DANH SÁCH BÀN TRỐNG</h3>
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
                            <n-collapse-item :style="{ 'font-size': '40px', 'font-weight': '700' }" :title="table.name"
                                class="cardTableItem">
                                <div class="cardInfo">
                                    <div>SỐ CHỖ NGỒI: {{ table.seat }}</div>
                                    <div v-if="table.place === 'outside'">VỊ TRÍ: OUTSIDE</div>
                                    <div v-else>VỊ TRÍ: INSIDE</div>
                                    <button class="btn btn-info" id="show-modal" @click="showModalBooking(index)">ĐẶT
                                        BÀN</button>
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
        const temp = reactive({
            tableID: null,
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
                    console.log(initTable.place)
                    console.log(filterData.value)
                    if (initTable.place !== null) {
                        filterData.value = res.value.filter((table) => table.place === initTable.place);
                        filter.value = filterData.value;
                    }
                    return filterData;
                })
                .then(function (res) {
                    console.log(res.value);
                    console.log(initTable.dateBooking);
                    res.value.forEach((table) => {
                        const result = table.reservations.find((reser) => {
                            console.log(reser.dateBooking);
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
            temp.tableID = filter.value[index]._id;
            temp.dateBooking = initTable.dateBooking;
            showModal.value = true;
        }

        function closeModal() {
            showModal.value = false;
        }

        onBeforeMount(() => {
            getAllTables();
        })


        return {
            initTable, filter, showModal, showModalBooking, closeModal, getfilterTable, getreset, loading, temp
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

.cardTableItem .cardInfo div {
    display: inline-block;
    margin: 15px 15px;
}

.cardTableItem .cardInfo button {
    float: right;
    margin-right: 20px;
}
</style>