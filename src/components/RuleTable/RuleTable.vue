<template>
    <table class="path-table">
        <tr>
            <th class="col-checkbox"></th>
            <th class="col-from">From</th>
            <th class="col-arrow"></th>
            <th class="col-to">To</th>
            <th class="col-action"></th>
        </tr>
        <tr v-for="rule in rules" :key="rule.id">
            <td><input type="checkbox" v-model="rule.active"></td>
            <td><span class="path" :title="rule.from">{{ rule.from }}</span></td>
            <td><span class="arrow"></span></td>
            <td><span class="path" :title="rule.to">{{ rule.to }}</span></td>
            <td><button @click="removeRule(rule.id)" type="button">Remove</button></td>
        </tr>
    </table>
</template>
<script>
import { EventBus } from './../../EventBus';
export default {
    props: {
        rules: {
            type: Array,
            required: true,
        },
    },

    methods: {
        removeRule(id) {
            EventBus.$emit('RemoveRule', id);
        },
    },
}
</script>
