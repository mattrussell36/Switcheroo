<template>
    <table class="head-table">
        <tr>
            <td class="col-checkbox"><input type="checkbox" :checked="group.active" @change="selectGroup"></td>
            <td class="col-from" colspan="3">
                <strong>{{ name }}</strong>
                <button @click="deleteGroup" type="button">Delete</button>
                <button @click="toggleGroup" type="button">{{ isOpen ? 'Hide' : 'Show' }}</button>
            </td>
        </tr>
    </table>
</template>
<script>
import { EventBus } from './EventBus';
export default {
    props: ['group', 'name', 'isOpen'],
    methods: {
        selectGroup(e) {
            EventBus.$emit('SelectGroup', {
                name: this.name,
                checked: e.target.checked
            });
        },
        deleteGroup() {
            EventBus.$emit('DeleteGroup', {
                name: this.name,
            });
        },
        toggleGroup() {
            EventBus.$emit('ToggleGroup', {
                name: this.name,
                state: !this.isOpen,
            });
        }
    }
}
</script>
