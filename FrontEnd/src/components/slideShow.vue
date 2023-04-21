<template>
    <vueper-slides :touchable="false" autoplay fixed-height="100%">
        <vueper-slide id="slide" v-for="(slide, i) in slides" :key="i" :image="slide.image" :title="slide.title"
            :content="slide.content" />
    </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {
    components: { VueperSlides, VueperSlide },
    data: () => ({
        slides: [
            {
                title: 'NHÀ HÀNG STEAK HOUSE',
                content: 'nơi mang lại trải nghiệm tuyệt vời cho bữa ăn của bạn',
                image: "https://cardiff.imgix.net/__data/assets/image/0004/2695540/GettyImages-1388791611.jpg?w=873&h=491&fit=crop&q=60&auto=format",
            },
            {
                title: '',
                content: '',
                image: "https://kdesign.vn/wp-content/uploads/2021/05/nha-hang-theo-phong-cach-trung-quoc-13danen.jpg",
            },
            {
                title: '',
                content: '',
                image: "https://popmenucloud.com/gjlhrpie/1d984609-c1c1-461a-9fdb-8587ee72aa32",
            },
        ]
    })
}
</script>

<style scoped>
#slide {
    /* color: #981B1E; */
    color: whitesmoke;
    font-size: 28px;
    font-weight: 600;
    text-shadow: 5px 2px 4px grey;
}
</style>