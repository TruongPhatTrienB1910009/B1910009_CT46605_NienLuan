<template>
    <div id="adminPage">
        <div class="container">
            <div class="adminPage__contain row">
                <div class="col-sm-8">
                    <canvas id="myChartBar"></canvas>
                </div>
                <div class="col-sm-4">
                    <canvas id="myChartPie"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref, onBeforeMount } from "vue";
import adminService from "../services/admin.service";

const dataBar = {
    labels: [],
    datasets: [{
        label: 'Số lượt đặt bàn',
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
            y: { // defining min and max so hiding the dataset does not change scale range
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
        label: 'Số lượt đặt theo bàn',
        data: [],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(254, 99, 132)',
            'rgb(53, 162, 235)',
            'rgb(254, 205, 86)',
            'rgb(253, 99, 132)',
            'rgb(52, 162, 235)',
            'rgb(253, 205, 86)',
            'rgb(252, 99, 132)',
            'rgb(51, 162, 235)',
            'rgb(252, 205, 86)',
            'rgb(250, 99, 132)',
        ],
        hoverOffset: 4
    }]
};

const configPie = {
    type: 'pie',
    data: dataPie,
};

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
}

.adminPage__contain {
    margin-top: 110px;
}

#myChartLine {
    width: 100% !important;
    min-height: 400px;
}
</style>