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
                            <button @click="editFood(food._id)" class="btn btn-primary">Chỉnh sửa</button>
                            <button @click="removeFood(food._id)" class="btn btn-danger ml-3">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addItemFood">
                <button v-if="!showForm" @click="show" class="btn btn-info">Thêm mới</button>
                <button v-else @click="show" class="btn btn-info">Đóng</button>
                <div v-if="showForm">
                    <addFoodForm />
                </div>
            </div>

            <div class="modal-containerCSS">
                <div class="modalCSS">
                    <h1>Cập nhật lại món ăn</h1>
                    <form @submit.prevent="updateFood">
                        <div class="formUpdate">
                            <label for="name">Tên</label>
                            <input v-model="formData.name" autofocus type="text">
                        </div>
                        <div class="formUpdate">
                            <label for="price">Giá</label>
                            <input v-model="formData.price" type="number" min="100000">
                        </div>
                        <div class="formUpdate">
                            <label for="typr">Loại</label>
                            <input v-model="formData.type" type="text">
                        </div>
                        <div>
                            <n-upload @before-upload="beforeUpload" @change="onChangeUpload" class="formUpdate-upload">
                                <n-button>TẢI ẢNH MỚI</n-button>
                            </n-upload>
                        </div>
                        <div class="formUpdate-action">
                            <button>CẬP NHẬT</button>
                            <button @click.prevent="closeModal">HỦY</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount, reactive, defineComponent } from 'vue';
import foodService from '../services/food.service';
import addFoodForm from '../components/addfood.vue';
export default defineComponent({
    components: { addFoodForm },
    setup() {
        const foods = ref([]);
        const formData = reactive({
            name: '',
            price: '',
            type: '',
            image: '',
            id: '',
        })

        const showForm = ref(false);

        async function getAllFoods() {
            try {
                foods.value = await foodService.getAllFood();
                console.log(foods.value);
            } catch (error) {
                console.log(error.message);
            }
        }

        function editFood(id) {
            document.querySelector(".modal-containerCSS").classList.add("show");
            formData.id = id;
        }

        function closeModal() {
            document.querySelector(".modal-containerCSS").classList.remove("show");
            formData.id = '';
        }

        async function updateFood() {
            try {
                let form = new FormData();
                form.append('name', formData.name);
                form.append('price', formData.price);
                form.append('type', formData.type);
                form.append('image', formData.image);
                const updated = await foodService.update(formData.id, form);
                console.log(updated);
                alert('Cập nhật thành công');
                closeModal();
            } catch (error) {
                console.log(error.message);
            }
        }

        function beforeUpload(data) {
            console.log(data.file.file?.type)
            if (data.file.file?.type !== "image/png" && data.file.file?.type !== "image/jpeg") {
                alert('Chỉ được tải ảnh lên')
                return false;
            }
            console.log(typeof data.file.file)
            return true;
        }

        function onChangeUpload(data) {
            try {
                formData.image = data.file.file;
            } catch (error) {
                console.log(error.message);
            }
        }

        async function removeFood(id) {
            try {
                await foodService.delete(id);
                alert("ĐÃ XÓA")
                getAllFoods();
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

        function show() {
            showForm.value = !showForm.value;
        }

        onBeforeMount(() => {
            getAllFoods();
        })

        return {
            foods, VND, getImageUrl, editFood, closeModal, beforeUpload, onChangeUpload, formData, updateFood, removeFood, showForm, show
        }
    }
})
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


/* modal */
.modal-containerCSS {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in;
    opacity: 0;
    pointer-events: none;
}

.modal-containerCSS.show {
    opacity: 1;
    pointer-events: auto;
}

.modalCSS {
    background-color: #fff;
    color: black;
    width: 600px;
    min-height: 300px;
    max-width: 100%;
    padding: 30px 50px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modalCSS h1 {
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    color: red;
}

.formUpdate {
    line-height: 20px;
    margin: 25px;
}

.formUpdate label {
    width: 15%;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
}

.formUpdate input {
    width: 85%;
    padding: 10px;
    font-size: 18px;
    outline: none;
}

.formUpdate-upload {
    display: flex;
    align-items: center;
    justify-content: center;
}

.formUpdate-action {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.formUpdate-action button {
    padding: 10px;
    margin: 20px 0;
    width: 180px;
    font-size: 18px;
    font-weight: 600;
    border: none;
}

.formUpdate-action button:first-child {
    background-color: aqua;
}

.formUpdate-action button:last-child:hover,
.formUpdate-action button:first-child:hover {
    background-color: red;
    color: white;
}

.addItemFood {
    margin-bottom: 20px;
}
</style>