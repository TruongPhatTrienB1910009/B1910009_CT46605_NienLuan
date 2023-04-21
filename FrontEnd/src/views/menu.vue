<template>
    <div class="container">
        <div class="menu">
            <div class="filter">
                <h1>Thực đơn nhà hàng</h1>
            </div>
            <h3>THỰC ĐƠN CÁC MÓN SNOW AGING WAGYU</h3>
            <foodContain :type="'wagyu'" />

            <h3>THỰC ĐƠN CÁC MÓN AGING BEEF</h3>
            <foodContain :type="'aging'" />

            <h3>THỰC ĐƠN CÁC MÓN SALAD</h3>
            <foodContain :type="'salad'" />

            <h3>THỰC ĐƠN CÁC MÓN CHEF'S SPECIAL</h3>
            <foodContain :type="'special'" />

        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import foodContain from '../components/containFood.vue';
export default defineComponent({
    components: {
        foodContain
    },

    setup(prop, { emit }) {

    }
})
</script>

<style scoped>
/* .card {} */

.menu {
    margin-top: 110px;
}

.menu .filter h1 {
    font-size: 48px;
    color: #981B1E;
    font-weight: 600;
    padding: 30px 0;
    text-align: center;
}

h3 {
    text-align: center;
    font-family: 'UTM Pacific Standard';
    color: #333 !important;
    font-size: 28px !important;
    margin-top: -20px;
    margin-bottom: 25px;
    font-weight: 700;
    text-transform: uppercase;
}

.foodContain {
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
}
</style>