<template>
    <div class="main">
        <div id="BGContainer">
            <div :class="[table.booked ? 'disabled' : '']" class="box"
                :style="{ left: `${table.location.left}` + 'px', top: `${table.location.top}` + 'px' }"
                v-for="table, index in Tables" :key="index" @click="retriveActiveIndex(index)">{{ table.name }}</div>
        </div>
        <div id="contentContainer">
            <tableInfo :table="tableIndex" />
        </div>
    </div>
</template>

<script>
import { ref, watch, onBeforeMount } from 'vue';
import tableService from '../services/table.service';
import tableInfo from '../components/tableInfo.vue';
export default {
    components: { tableInfo },
    setup() {
        const Tables = ref([]);
        const tableIndex = ref(null);
        const activeIndex = ref(-1);


        async function getAllTables() {
            Tables.value = (await tableService.getAllTables()).tables;
        }

        function retriveActiveIndex(index) {
            activeIndex.value = index;
        }

        watch(activeIndex, (newActiveIndex, oldActiveindex) => {
            tableIndex.value = Tables.value[newActiveIndex];
            console.log(tableIndex.value);
        })

        onBeforeMount(getAllTables);

        return { Tables, retriveActiveIndex, tableIndex, activeIndex }
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

.box {
    position: absolute;
    padding: 40px;
    border-radius: 50%;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box:hover {
    background: green;
    color: white;
    cursor: pointer;
}

.disabled {
    background-color: rgb(99, 25, 25);
    color: linen;
    opacity: 1;
}

.disabled:hover {
    cursor: not-allowed;
    background-color: black;
}

#contentContainer {
    width: 40%;
    background: #fff;
    display: flex;
}
</style>


