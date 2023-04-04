<template>
    <div id="overView">
        <div class="container">
            <div class="containFoods row">
                <div class="col-sm-4" v-for="food, index in foods" :key="foods">
                    <div class="card">
                        <img class="card-img-top" :src="getImageUrl(food.image.data.data)" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{ food.name }}</h5>
                            <p class="card-text">{{ VND.format(food.price) }}</p>
                            <p class="card-text">{{ food.type }}</p>
                            <button class="btn btn-primary">Chỉnh sửa</button>
                            <button class="btn btn-danger ml-3">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addItemFood">
                <button class="btn btn-info">Thêm mới</button>
                <div>
                    <addFoodForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import foodService from '../services/food.service';
import addFoodForm from '../components/addfood.vue';
export default {
    components: { addFoodForm },
    setup() {
        const foods = ref([]);
        async function getAllFoods() {
            try {
                foods.value = await foodService.getAllFood();
                console.log(foods.value);
            } catch (error) {
                console.log(error.message);
            }
        }

        const VND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        const getImageUrl = (name) => {
            const img = String.fromCharCode.apply(null, name);
            return new URL(`../assets/images/foods/${img}`, import.meta.url).href
        }

        onBeforeMount(() => {
            getAllFoods();
        })

        return { foods, VND, getImageUrl }
    }
}
</script>

<style scoped>
#overView {
    min-height: 100vh;
}

.container {
    margin-top: 120px
}

.containFoods {
    margin-bottom: 20px;
}

.col-sm-4 {
    padding: 0 10px;
    margin: 0px;
    margin-bottom: 10px;
}
</style>