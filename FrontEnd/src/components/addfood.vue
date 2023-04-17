<template>
    <div class="addFoods">
        <form @submit.prevent="uploadNewFood" enctype="multipart/form-data">
            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Tên</label>
                <div class="col-sm-10">
                    <input v-model="formData.name" type="text" class="form-control" id="">
                </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Giá</label>
                <div class="col-sm-10">
                    <input v-model="formData.price" type="number" class="form-control" id="">
                </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Loại</label>
                <div class="col-sm-10">
                    <input v-model="formData.type" type="text" class="form-control" id="">
                </div>
            </div>
            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Ảnh</label>
                <div class="col-sm-10">
                    <n-upload @before-upload="beforeUpload" @change="onChangeUpload">
                        <n-button>TẢI ẢNH LÊN</n-button>
                    </n-upload>
                </div>
            </div>
            <button type="submit" class="btn btn-info">THÊM</button>
        </form>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import foodService from '../services/food.service';
export default defineComponent({
    setup() {
        const formData = reactive({
            name: '',
            price: 0,
            type: '',
            image: ''
        })

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

        async function uploadNewFood() {
            if (formData.name != '' && formData.price != 0 && formData.type != '') {
                try {
                    let form = new FormData();
                    form.append('name', formData.name);
                    form.append('price', formData.price);
                    form.append('type', formData.type);
                    form.append('image', formData.image);
                    const result = await foodService.createFood(form);
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                throw new Error("some error occurred");
            }
        }

        return {
            beforeUpload, formData, onChangeUpload, uploadNewFood
        };
    }
});
</script>
<style scoped>
.addFoods {
    margin: 20px auto;
    width: 600px;
}

input[type="file"] {
    display: none;
}

#label-img {
    color: white;
    height: 60px;
    width: 250px;
    background-color: #f5af09;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
}
</style>