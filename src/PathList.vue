<template>
    <ul>
        <li class="paths" v-for="(path, index) in paths">
            <input type="checkbox" v-model="path.active">
            <span>{{ path.from }}</span>
            <span>TO</span>
            <span>{{ path.to }}</span>
            <button @click="remove(index)" type="button">X</button>
        </li>
    </ul>
</template>
<script>
import { EventBus } from './EventBus';
export default {
    props: ['name', 'paths'],
    methods: {
        remove(index) {
            EventBus.$emit('DeletePath', {
                name: this.name,
                index,
            });
        },
    }
}
</script>
