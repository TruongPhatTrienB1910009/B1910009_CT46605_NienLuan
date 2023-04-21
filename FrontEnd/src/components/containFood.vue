<template>
    <div class="foodContain">
        <div v-for="slide, index in filters" :key="index">
            <div class="card" style="width:500px">
                <img class="card-img-top img-fluid" :src="getImageUrl(slide.image.data.data)" alt="Card image"
                    style="width:100%">
                <div class="card-body">
                    <h4 class="card-title">{{ slide.name }}</h4>
                    <p class="card-text">{{ VND.format(slide.price) }}</p>
                    <div v-if="authStore.isLogin">
                        <div v-if="!slide.added">
                            <button v-if="reserID !== undefined" @click="addFood(slide._id)" class="btn btn-danger">ĐẶT
                                MÓN</button>
                            <p v-else>Vui lòng chọn bàn ăn của bạn ở trang
                                <RouterLink :to='{ name: "Profile" }'>profile</RouterLink>
                                trước khi đặt món
                            </p>
                        </div>
                        <div v-else>
                            <button disabled v-if="reserID !== undefined" class="btn btn-info">ĐÃ
                                ĐẶT...</button>
                            <p v-else>Vui lòng chọn bàn ăn của bạn ở trang
                                <RouterLink :to='{ name: "Profile" }'>profile</RouterLink>
                                trước khi đặt món
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <p>Bạn phải đặt bàn trước khi thêm món ăn</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import foodService from '../services/food.service';
import reservationService from '../services/reservation.service';

export default {
    props: ['type'],
    setup(props, { emit }) {
        const route = useRoute();
        const reserID = ref(route.query.ReserID);
        const authStore = useAuthStore();
        const foods = ref([]);
        const reserFoods = ref([]);

        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        const getImageUrl = (name) => {
            const img = String.fromCharCode.apply(null, name);
            return new URL(`../assets/images/foods/${img}`, import.meta.url).href
        }

        const filters = ref([]);

        async function getFoods() {
            foods.value = await foodService.getAllFood();
            filterFoodsByType();
        }


        async function filterFoods() {
            if (reserID.value !== undefined) {
                reserFoods.value = (await reservationService.getReservationByID(reserID.value)).foods;
                console.log(reserFoods.value);
                if (reserFoods.value.length > 0) {
                    foods.value.forEach((food) => {
                        reserFoods.value.forEach((rfood) => {
                            if (food._id == rfood._id) {
                                food.added = true;
                            }
                        })
                        if (food.added == undefined) {
                            food.added = false;
                        }
                    })
                }
            }
        }

        function filterFoodsByType() {
            filters.value = foods.value.filter((food) => {
                console.log('food.type', food.type, 'props.type', props.type);
                return food.type == props.type;
            })
        }

        async function addFood(id) {
            try {
                const data = reactive({
                    foodID: id,
                    // reserID: reserID.value,
                    action: "add"
                })
                console.log(data);
                await reservationService.addorremoveFood(reserID.value, data);
                getFoods();
                filterFoods();
            } catch (error) {
                console.log(error)
            }
        }

        onBeforeMount(() => {
            getFoods();
            filterFoods();
        })

        return { getImageUrl, VND, reserID, filters, authStore, addFood }
    }
}
</script>

<style scoped>
.foodContain {
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
}
</style>