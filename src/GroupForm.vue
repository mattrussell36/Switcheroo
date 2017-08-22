<template>
    <div>
        <h3>Add Group</h3>
        <form @submit.prevent="addGroup">
            <input type="text" v-model="name">
            <button type="submit">Add</button>
        </form>
    </div>
</template>
<script>
import { EventBus } from './EventBus';
export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        addGroup(index) {
            EventBus.$emit('AddGroup', {
                name: this.name,
            });
        },
    }
}
</script>
