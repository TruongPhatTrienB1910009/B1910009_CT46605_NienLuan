<template>
    <div id="adminPage">
        <div class="adminPage__contain">
            <div class="chartContain">
                <div class="chart ChartBar">
                    <canvas id="myChartBar"></canvas>
                </div>
                <div class="chart ChartPie">
                    <canvas id="myChartPie"></canvas>
                </div>
            </div>
            <div class="listContain">
                <div class="listConfirm">
                    <h3>CÁC BÀN ĂN CẦN XÁC NHẬN</h3>
                    <n-scrollbar style="max-height: 360px">
                        <div class="cardReser" v-for="(reser, index) in reservations" :key="index">
                            <div v-if="!reser.acepted" class="title" @click="handleAccordion(reser._id)">
                                <span>Ngày đặt: {{ reser.dateBooking }}</span>
                            </div>
                            <Collapse :when="reser.isExpanded" class="v-collapse">
                                <div class="cardReser-group row ml-3">
                                    <div class="col-sm-6">
                                        <p>Tên người nhận: <span>{{ reser.name }}</span></p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p>Số điện thoại: <span>{{ reser.phone }}</span></p>
                                    </div>
                                </div>
                                <div class="cardReser-group row ml-3">
                                    <div class="col-sm-6">
                                        <p>Thời gian: <span>{{ reser.timeBooking }}</span></p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p>Số chỗ ngồi: <span>{{ reser.seat }}</span></p>
                                    </div>
                                </div>
                                <div class="foods">
                                    <h4 class="m-3">MÓN ĂN</h4>
                                    <div v-for="food, fIndex in reser.foods" :key="fIndex">
                                        <div class="row m-3">
                                            <p class="col-sm-4">{{ food.name }}</p>
                                            <p class="col-sm-4">{{ food.price }}</p>
                                            <p class="col-sm-4"><button @click="removeFood({
                                                reserID: reser._id, foodID: food._id, action: 'remove'
                                            })" class="btn btn-danger">Xóa</button></p>
                                        </div>
                                    </div>
                                </div>
                                <button v-if="!reser.acepted" @click="accept(reser._id)" class="btn btn-info ml-3 mb-2">XÁC
                                    NHẬN</button>
                                <button @click="DeleteReser(reser._id)" class="btn btn-info ml-3 mb-2">HỦY BỎ</button>
                            </Collapse>
                        </div>
                    </n-scrollbar>
                </div>
                <div class="listConfirmed">
                    <h3>CÁC BÀN ĂN CẦN ĐÃ XÁC NHẬN</h3>
                    <n-scrollbar style="max-height: 360px">
                        <div class="cardReser" v-for="(reser, index) in reservationsAcepted" :key="reser._id">
                            <div v-if="reser.acepted" class="title" @click="handleAccordion2(reser._id)">
                                <span>Ngày đặt: {{ reser.dateBooking }}</span>
                            </div>
                            <Collapse :when="reser.isExpanded" class="v-collapse">
                                <div class="cardReser-group row ml-3">
                                    <div class="col-sm-6">
                                        <p>Tên người nhận: <span>{{ reser.name }}</span></p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p>Số điện thoại: <span>{{ reser.phone }}</span></p>
                                    </div>
                                </div>
                                <div class="cardReser-group row ml-3">
                                    <div class="col-sm-6">
                                        <p>Thời gian: <span>{{ reser.timeBooking }}</span></p>
                                    </div>
                                    <div class="col-sm-6">
                                        <p>Số chỗ ngồi: <span>{{ reser.seat }}</span></p>
                                    </div>
                                </div>
                                <div class="foods">
                                    <h4 class="m-3">MÓN ĂN</h4>
                                    <div v-for="food, fIndex in reser.foods" :key="fIndex">
                                        <div class="row m-3">
                                            <p class="col-sm-4">{{ food.name }}</p>
                                            <p class="col-sm-4">{{ food.price }}</p>
                                            <p class="col-sm-4"><button @click="removeFood({
                                                reserID: reser._id, foodID: food._id, action: 'remove'
                                            })" class="btn btn-danger">Xóa</button></p>
                                        </div>
                                    </div>
                                </div>
                                <button v-if="!reser.acepted" @click="accept(reser._id)" class="btn btn-info ml-3 mb-2">XÁC
                                    NHẬN</button>
                                <button @click="DeleteReser(reser._id)" class="btn btn-info ml-3 mb-2">HỦY BỎ</button>
                            </Collapse>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, onBeforeMount } from "vue";
import adminService from "../services/admin.service";
import reservationService from "../services/reservation.service";
import { Collapse } from 'vue-collapsed';

const dataBar = {
    labels: [],
    datasets: [{
        label: 'Số lượt đặt bàn theo tháng',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        backgroundColor: 'brown'
    }]
};

const configBar = {
    type: 'bar',
    data: dataBar,
    options: {
        scales: {
            y: {
                min: 0,
                max: 14
            }
        }
    }
};

const dataPie = {
    labels: [
        'A1',
        'A2',
        'A3',
        'A4',
        'A5',
        'A6',
        'B1',
        'B2',
        'B3',
        'B4',
        'B5',
        'B6',
        'B7',
    ],
    datasets: [{
        label: 'Số lượt đặt',
        data: [],
        backgroundColor: [
            'rgb(255,0,255)',
            'rgb(192,192,192)',
            'rgb(128,128,128)',
            'rgb(128,0,0)',
            'rgb(128,128,0)',
            'rgb(0,128,0)',
            'rgb(128,0,128)',
            'rgb(0,128,128)',
            'rgb(0,0,128)',
            'rgb(255,0,0)',
            'rgb(0,255,0)',
            'rgb(0,0,255)',
            'rgb(255,255,0)',
        ],
        hoverOffset: 4
    }],
};

const configPie = {
    type: 'pie',
    data: dataPie,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê số lượt đặt theo từng bàn trong năm'
            }
        }
    },
};

const reservations: any = ref([])
const reservationsAcepted: any = ref([])

async function getAllResers() {
    reservations.value = await reservationService.getAll();
    reservations.value.forEach((reser: any, index: number) => {
        reser["isExpanded"] = false;
    })
    reservationsAcepted.value = reservations.value.filter((reser: any, index: number) => {
        return reser.acepted == true;
    })

    reservations.value = reservations.value.filter((reser: any, index: number) => {
        return reser.acepted == false;
    })
}

function handleAccordion(selectedIndex: string) {
    reservations.value.forEach((reser: any, index: number) => {
        if (reser._id == selectedIndex) {
            reser.isExpanded = !reser.isExpanded;
        } else {
            reser.isExpanded = false;
        }
    })
}

function handleAccordion2(selectedIndex: string) {
    reservationsAcepted.value.forEach((reser: any, index: number) => {
        if (reser._id == selectedIndex) {
            reser.isExpanded = !reser.isExpanded;
        } else {
            reser.isExpanded = false;
        }
    })
}

async function removeFood(data: any) {
    await reservationService.addorremoveFood(data);
    getAllResers();
}

async function accept(reserID: string) {
    try {
        await reservationService.aceptReser(reserID);
        getAllResers();
    } catch (error) {
        console.log(error.message);
    }
}

async function DeleteReser(reserID: string) {
    try {
        await reservationService.deleteReser(reserID);
        getAllResers();
    } catch (error) {
        console.log(error.message);
    }
}

onBeforeMount(() => {
    getAllResers();
})

onMounted(async () => {
    const filter = await adminService.statisticalRecent();
    const myChartBar = new Chart(document.getElementById("myChartBar"),
        configBar
    );
    myChartBar.data.labels = filter.categories;
    myChartBar.data.datasets[0].data = filter.data;
    myChartBar.update();

    const myChartPie = new Chart(document.getElementById("myChartPie"),
        configPie
    );
    myChartPie.data.datasets[0].data = filter.times;
    myChartPie.update();
})


</script>

<style scoped>
#adminPage {
    min-height: 100vh;
    background-color: #eae2e2;
}


.adminPage__contain {
    padding-top: 120px;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

.chart {
    background-color: white;
}

.listContain {
    height: 460px;
    display: flex;
    justify-content: space-between;
    padding: 8px 0 20px 0;
}

.chartContain {
    height: 360px;
    display: flex;
    justify-content: space-between;
}

.chart {
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.listConfirm,
.ChartBar {
    width: 59.5%;
}

.listConfirmed,
.ChartPie {
    width: 40%;
}

.listConfirm,
.listConfirmed {
    padding: 10px;
    border-radius: 10px;
    background-color: white;
}

/* cardReser */
.cardReser {
    line-height: 50px;
    border: 1px solid #ccc;
}

.title {
    height: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
    text-transform: uppercase;
}

.title:hover {
    cursor: pointer;
}
</style>