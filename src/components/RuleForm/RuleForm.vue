<template>
    <div>
        <h3>Add Rule</h3>
        <form @submit.prevent="addRule">
            <input type="text" v-model="from" placeholder="Regex pattern">
            <input type="text" v-model="to" placeholder="Replace with">
            <button type="submit">Add</button>
        </form>
    </div>
</template>
<script>
import { EventBus } from './../../EventBus';
import Guid from 'guid';
export default {
    data() {
        return {
            from: '',
            to: '',
        };
    },
    methods: {
        addRule(index) {
            EventBus.$emit('AddRule', {
                id: Guid.raw(),
                from: this.from,
                to: this.to,
                active: true,
            });
        },
    }
}
</script>
