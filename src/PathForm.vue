<template>
    <tr>
        <td></td>
        <td><input @keyup.13="add" v-model="from" type="text" placeholder="From path"></td>
        <td><span class="arrow"></span></td>
        <td><input @keyup.13="add" v-model="to" type="text" placeholder="To path"></td>
        <td><button @click="add" type="submit">Add</button></td>
    </tr>
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
