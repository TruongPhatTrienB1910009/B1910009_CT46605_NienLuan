<template>
    <cardReser v-for="index, reser in data.user.reservations" :key="index" />
</template>

<script>
import { reactive } from 'vue';
import cardReser from './cardReservation.vue';
export default {
    props: ["document"],
    components: { cardReser },
    setup(props, { emit }) {
        const data = reactive(props.document);

        return { data }
    }
}
</script>

