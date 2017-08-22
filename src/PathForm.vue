<template>
    <form @submit.prevent="add">
        <input v-model="from" type="text">
        <input v-model="to" type="text">
        <button type="submit">Add</button>
    </form>
</template>
<script>
import { EventBus } from './EventBus';
export default {
    props: ['name'],
    data() {
        return {
            from: '',
            to: '',
        };
    },
    methods: {
        add() {
            EventBus.$emit('AddPath', {
                group: this.name,
                from: this.from,
                to: this.to,
                active: false,
            });
        }
    }
}
</script>
