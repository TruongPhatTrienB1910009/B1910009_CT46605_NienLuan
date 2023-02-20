<template>
    <div class="mainContainer row">
        <div class="formReser col-sm-6">
            <form>
                <h4 class="text-center">VUI LÒNG ĐIỀN THÔNG TIN CỦA BẠN</h4>
                <div class="form-group">
                    <label for="name">Tên của bạn:</label>
                    <input type="text" class="form-control" id="name" placeholder="Họ và tên" name="name">
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại:</label>
                    <input type="text" class="form-control" id="phone" placeholder="Số điện thoại" name="phone">
                </div>
                <DatePicker />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="tableInfo col-sm-6">
            <h1>THONG TIN BAN</h1>
            <p>{{ dataTable.value.name }}</p>
            <p>{{ dataTable.value.seat }}</p>
            <p>{{ dataTable.value.place }}</p>
        </div>
    </div>
</template>

<script>
// import 'v-calendar/dist/style.css';
import { DatePicker } from 'v-calendar';
import { reactive, toRef } from 'vue';
export default {
    props: ['table'],
    setup(props) {
        const dataTable = reactive(props.table);
        return { dataTable }
    }
}
</script>

<style scoped>
.tableInfo {
    text-align: center;
}
</style>