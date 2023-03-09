<template>
    <div class="main">
        <div id="BGContainer">
            <img class="img-response" src="../assets/images/restaurant.png" alt="">
        </div>
        <div id="contentContainer">
            <tableInfo />
        </div>
    </div>
</template>

<script>
import tableInfo from '../components/tableInfo.vue';
export default {
    components: { tableInfo },
    setup() {
    }
}
</script>

<style scoped>
.main {
    margin-top: 110px;
    display: flex;
    position: relative;
}

.modal {
    position: fixed;
    width: 200px;
    height: 200px;
    z-index: 10;
    background-color: rgb(145, 156, 165);
}

.img-response {
    width: 100%;
    height: auto;
}

#BGContainer {
    width: 60%;
}

#contentContainer {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>