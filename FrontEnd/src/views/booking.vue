<template>
    <div class="container">
        <bookingForm :table="table" @createReser="postReser" />
    </div>
</template>

<script>
import bookingForm from '../components/bookingForm.vue';
import tableService from '../services/table.service';
import { onBeforeMount, reactive } from 'vue';
import reservationService from '../services/reservation.service';
export default {
    components: { bookingForm },
    props: ['id'],
    setup(props) {
        const table = reactive({ value: {} });
        async function postReser(data) {
            try {
                data.table = props.id;
                await reservationService.createReservation(data);
            } catch (error) {
                console.log(error);
            }
        }

        onBeforeMount(async () => {
            table.value = await tableService.getTableById(props.id);
        })

        return { table, postReser }
    }
}
</script>