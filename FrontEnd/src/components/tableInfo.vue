<template>
    <div v-if="tableInfo !== null" class="mainContent">
        <div v-if="!tableInfo.booked">
            <h2>THÔNG TIN BÀN {{ tableInfo.name }}</h2>
            <p>Số chỗ ngồi: {{ tableInfo.seat }}</p>
            <button @click="gotoBooking(tableInfo._id)" type="button" class="btn btn-primary">ĐẶT BÀN</button>
        </div>
        <div v-else>
            <h2>BÀN NÀY ĐÃ CÓ KHÁCH</h2>
        </div>
    </div>
    <div class="mainContent" v-else>
        <h2>MỜI BẠN CHỌN BÀN TRÊN BẢN VẼ</h2>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
export default {
    props: ['table'],
    setup(props) {
        const tableInfo = ref(props.table);
        console.log(props.table)
        const router = useRouter();
        function gotoBooking(tableId) {
            router.push({
                name: 'Booking',
                params: { id: tableId }
            })
        }


        watch(() => props.table, (newValue, oldValue) => {
            tableInfo.value = newValue;
        }, { deep: true }, { immediate: true })

        return {
            tableInfo, gotoBooking
        }
    }
}
</script>

<style scoped>
.mainContent {
    margin-top: 20px;
    width: 100%;
}

h2 {
    text-align: center;
}
</style>