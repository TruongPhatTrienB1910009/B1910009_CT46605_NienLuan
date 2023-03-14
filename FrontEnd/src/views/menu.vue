<template>
    <div class="container">
        <div class="menu">
            <div class="filter">
                <h1>Thực đơn nhà hàng</h1>
            </div>
            <div class="wagyu">
                <h3>THỰC ĐƠN CÁC MÓN SNOW AGING WAGYU</h3>
                <div @mouseleave="time = 3000">
                    <Carousel :autoplay="time" :items-to-show="2.5" :wrap-around="true">
                        <Slide v-for="slide in foods" :key="slide">
                            <div v-if="slide.type === 'Wagyu'" @mouseenter="time = 60000" class="card" style="width:500px">
                                <img class="card-img-top img-fluid" :src="getImageUrl(slide.image)" alt="Card image"
                                    style="width:100%">
                                <div class="card-body">
                                    <h4 class="card-title">{{ slide.name }}</h4>
                                    <p class="card-text">{{ VND.format(slide.price) }}</p>
                                    <div v-if="!slide.added">
                                        <button v-if="reserID !== undefined" @click="addFood(slide._id)"
                                            class="btn btn-danger">ĐẶT MÓN</button>
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
                            </div>
                        </Slide>
                        <template #addons>
                            <Navigation />
                        </template>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, reactive } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css';
import foodService from '../services/food.service';
import reservationService from '../services/reservation.service';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    components: {
        Carousel,
        Slide,
        Navigation,
    },

    setup(prop, { emit }) {
        const time = ref(3000);
        const foods = ref([]);
        const route = useRoute();
        const reserID = ref(route.query.ReserID);
        const reserFoods = ref([]);

        async function filterFoods() {
            reserFoods.value = (await reservationService.getReservationByID(reserID.value)).foods;
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

        async function getFoods() {
            foods.value = await foodService.getAllFood();
        }

        const getImageUrl = (name) => {
            return new URL(`../assets/images/${name}`, import.meta.url).href
        }

        async function addFood(food) {
            const data = reactive({
                foodID: food,
                reserID: reserID.value,
                action: "add"
            })
            await reservationService.addorremoveFood(data);
            getFoods();
            filterFoods();
        }

        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });


        onBeforeMount(() => {
            getFoods();
            filterFoods();
        })
        return { time, foods, getImageUrl, VND, reserID, addFood }
    }
})
</script>

<style scoped>
.card {
    margin: 0 4px;
}

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

.wagyu h3 {
    text-align: center;
    font-family: 'UTM Pacific Standard';
    color: #333 !important;
    font-size: 28px !important;
    margin-top: -20px;
    margin-bottom: 25px;
    font-weight: 700;
    text-transform: uppercase;
}
</style>