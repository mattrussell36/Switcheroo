<template>
    <tr>
        <td></td>
        <td>
            <input @keyup.13="add"
                v-model="fromValue"
                :class="{ error: !fromState }"
                type="text"
                placeholder="From path">
        </td>
        <td>
            <span class="arrow"></span>
        </td>
        <td>
            <input @keyup.13="add"
                v-model="toValue"
                :class="{ error: !toState }"
                type="text"
                placeholder="To path">
        </td>
        <td>
            <button @click="add" type="submit">Add</button>
        </td>
    </tr>
</template>
<script>
import { EventBus } from './EventBus';
export default {
    props: ['name'],
    data() {
        return {
            fromValue: '',
            toValue: '',
            fromState: true,
            toState: true,
        };
    },
    watch: {
        fromValue() {
            this.validate();
        },
        toValue() {
            this.validate();
        }
    },
    methods: {
        validate() {
            this.fromState = this.fromValue.length ? true : false;
            this.toState = this.toValue.length ? true: false;

            if (!this.fromState || !this.toState) {
                return false;
            }
        },
        add() {
            if (!this.validate()) {
                return;
            }

            EventBus.$emit('AddPath', {
                group: this.name,
                from: this.fromValue,
                to: this.toValue,
                active: false,
            });
        }
    }
}
</script>
