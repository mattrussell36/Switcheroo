<template>
    <p>
        <input type="checkbox" ref="checkbox" @change="selectGroup(name)">
        <strong>{{ name }}</strong>
        <button @click="deleteGroup(name)" type="button">Delete</button>
    </p>
</template>
<script>
import { EventBus } from './EventBus';
export default {
    props: ['name'],
    methods: {
        selectGroup(name) {
            EventBus.$emit('SelectGroup', {
                name: this.name,
                checked: this.$refs.checkbox.checked
            })
        },
        deleteGroup() {
            EventBus.$emit('DeleteGroup', {
                name: this.name,
            });
        }
    }
}
</script>
