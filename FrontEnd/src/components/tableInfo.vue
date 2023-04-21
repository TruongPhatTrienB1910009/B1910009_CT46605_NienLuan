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
                            <td>
                                <button @click.prevent="handleCreate" v-if="authStore.role == 'admin'"
                                    class="btn btn-primary">THÊM
                                    BÀN</button>
                            </td>
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
                                    <div class="div__btn" v-if="authStore.role == 'admin'">
                                        <button @click="deleteTable(table._id)">Xóa</button>
                                        <button @click="handleUpdateTable(table._id)">Chỉnh sửa</button>
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

    <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>ĐIỀN THÔNG TIN</h3>
                    {{ show }}
                </div>

                <div class="modal-body">
                    <div class="infoBooking row">
                        <span class="col-sm-4">TÊN BÀN:</span>
                        <input placeholder="Tên bàn" class="col-sm-8" type="text" v-model="update.name">
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">SỐ CHỖ NGỒI:</span>
                        <input class="col-sm-8" type="number" min="1" v-model="update.seat">
                    </div>
                    <div class="infoBooking row">
                        <span class="col-sm-4">VỊ TRÍ:</span>
                        <select class="col-sm-8" name="place" v-model="update.place">
                            <option value="inside">inside</option>
                            <option value="outside">outside</option>
                        </select>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="updateTableByID(show.id)" v-if="show.action == 'update'"
                        class="modal-default-button btn btn-info">
                        CẬP NHẬT
                    </button>
                    <button @click="createTable" v-else class="modal-default-button btn btn-info">
                        THÊM BÀN
                    </button>
                    <button @click="show = false" class="modal-default-button btn btn-danger">
                        HỦY
                    </button>
                </div>
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
        const show = ref(false);
        const authStore = useAuthStore();
        const temp = reactive({
            table: null,
            dateBooking: new Date(Date.now()).toISOString().slice(0, 10)
        });
        const update = reactive({
            name: '',
            seat: '',
            place: '',
        })

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

        function resetUpdates() {
            update.name = '';
            update.seat = '';
            update.place = '';
        }

        async function handleUpdateTable(id) {
            console.log(id);
            const table = await tableService.getTableById(id);
            console.log(table);
            update.name = table.name;
            update.seat = table.seat;
            update.place = table.place;
            show.value = { id: id, action: "update" };
        }

        async function updateTableByID(id) {
            await tableService.updateTable(id, update);
            alert("Cập nhật thành công");
            show.value = false;
            resetUpdates();
            getAllTables();
        }

        function handleCreate() {
            resetUpdates();
            show.value = true;
        }

        async function createTable() {
            await tableService.createTable(update);
            alert("Tạo bàn thành công");
            getAllTables();
            show.value = false;
        }

        async function deleteTable(id) {
            await tableService.deleteTable(id);
            getAllTables();
            alert("Xóa thành công");
        }

        onBeforeMount(() => {
            getAllTables();
        })


        return {
            initTable, filter, showModal, showModalBooking, closeModal, getfilterTable, getreset, loading, temp, authStore, handleUpdateTable,
            show, update, updateTableByID, handleCreate, createTable, deleteTable
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


.div__btn button {
    padding: 10px;
    min-width: 120px;
    color: white;
}

.div__btn button:hover {
    cursor: pointer;
}


.div__btn button:first-child {
    background-color: crimson;
}

.div__btn button:last-child {
    background-color: #58257b;
    margin-left: 25px;
}

.btn-click {
    background-color: #ccc;
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

.modal-body .infoBooking {
    margin: 10px 0;
}

.modal-body>* {
    font-size: 14px;
    line-height: 40px;
}

.modal-body .infoBooking input,
.modal-body .infoBooking select {
    border: 1px solid #ccc;
}
</style>