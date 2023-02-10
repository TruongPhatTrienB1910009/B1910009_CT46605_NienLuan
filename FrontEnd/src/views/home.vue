<template>
    <div class="main">
        <div id="BGContainer"></div>
        <div id="contentContainer">

        </div>
    </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue';
import tableService from '../services/table.service';
export default {
    setup() {
        const Tables = [];
        function getOffsetXY(event) {
            console.log(event);
        }

        async function getAllTables() {
            Tables = await tableService.getAllTables();
            console.log(Tables);
        }

        onBeforeMount(getAllTables);

        return { getOffsetXY, Tables }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    width: 100%;
    margin-top: 70px
}

#BGContainer {
    height: 800px;
    width: 60%;
    background-image: url("C:\Users\ADMIN\Desktop\NIEN LUAN NGANH\NIENLUAN\WEB_NIENLUAN\FrontEnd\public\images\BG.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}

.box1 {
    position: absolute;
    left: 70px;
    top: 20px;
    padding: 40px;
    border-radius: 50%;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box1:hover {
    background: green;
    color: white;
    cursor: pointer;
}

.box2 {
    position: absolute;
    left: 240px;
    top: 20px;
    padding: 40px;
    border-radius: 50%;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box2:hover {
    background: green;
    color: white;
    cursor: pointer;
}

.box3 {
    position: absolute;
    left: 400px;
    top: 20px;
    padding: 40px;
    border-radius: 50%;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box3:hover {
    background: green;
    color: white;
    cursor: pointer;
}
</style>


