<template>
    <table class="path-table">
        <tr>
            <th class="col-checkbox"></th>
            <th class="col-from">From</th>
            <th class="col-arrow"></th>
            <th class="col-to">To</th>
            <th class="col-action"></th>
        </tr>
        <tr class="paths" v-for="(path, index) in paths">
            <td><input type="checkbox" v-model="path.active"></td>
            <td><span class="path" :title="path.from">{{ path.from }}</span></td>
            <td><span class="arrow"></span></td>
            <td><span class="path" :title="path.to">{{ path.to }}</span></td>
            <td><button @click="remove(index)" type="button">Remove</button></td>
        </tr>
        <path-form :name="name" />
    </table>
</template>
<script>
import { EventBus } from './EventBus';
import PathForm from './PathForm.vue';
export default {
    props: ['name', 'paths'],
    methods: {
        remove(index) {
            EventBus.$emit('DeletePath', {
                name: this.name,
                index,
            });
        },
    },
    components: {
        PathForm,
    }
}
</script>
