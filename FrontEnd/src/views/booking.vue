<template>
    <div class="container">
        <bookingForm :table="table" />
    </div>
</template>

<script>
import bookingForm from '../components/bookingForm.vue';
import tableService from '../services/table.service';
import { ref, onBeforeMount, reactive } from 'vue';
export default {
    components: { bookingForm },
    props: ['id'],
    setup(props) {
        const table = reactive({ value: {} });
        onBeforeMount(async () => {
            table.value = await tableService.getTableById(props.id);
        })

        return { table }
    }
}
</script>