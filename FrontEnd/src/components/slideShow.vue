<template>
    <vueper-slides :touchable="false" autoplay fixed-height="100%">
        <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" :title="slide.title"
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
                title: '',
                content: '',
                image: "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd1eeaf9e-a8f1-11eb-9b76-9500a3917e5f.jpg?crop=7573%2C4260%2C221%2C899&resize=1200",
            },
            {
                title: '',
                content: '',
                image: "https://www.coles.com.au/content/dam/coles/inspire-create/dec20-images/December20-seafood-platter-976x549.jpg",
            },
            {
                title: '',
                content: '',
                image: "https://cdn.vox-cdn.com/thumbor/7Rz9pDWhpC83Cfa7HE30pkbExkI=/0x0:1000x667/1200x900/filters:focal(420x254:580x414):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62558206/7677195C_5AC2_488B_822D_B74E42D909B7.0.0.jpeg",
            },
            // Other slides.
        ]
    })
}
</script>

<style scoped></style>