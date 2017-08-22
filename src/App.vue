<template>
    <div>
        <h1>{{ title }}</h1>
        <div>
            <div v-for="(group, name) in groups">
                <group-title :name="name" />
                <path-list :name="name" :paths="group.paths" />
                <path-form :name="name" />
            </div>
            <hr>
            <group-form />
        </div>
        <div>
            {{ JSON.stringify(this.groups, null, 2) }}
        </div>
    </div>
</template>
<script>
import { EventBus } from './EventBus';
import PathForm from './PathForm.vue';
import PathList from './PathList.vue';
import GroupTitle from './GroupTitle.vue';
import GroupForm from './GroupForm.vue';
export default {
    data() {
        return {
            title: 'Switcheroo',
            groups: {},
        };
    },

    created() {
        this.groups = chrome.extension.getBackgroundPage().rules;

        EventBus.$on('AddPath', (payload) => {
            this.groups[payload.group].paths.push({
                from: payload.from,
                to: payload.to,
                active: payload.active
            });
        });

        EventBus.$on('DeletePath', (payload) => {
            const newArr = Array.from(this.groups[payload.name].paths);
            newArr.splice(payload.index, 1);

            this.$set(this.groups[payload.name], 'paths', newArr)
        });

        EventBus.$on('AddGroup', payload => {
            this.$set(this.groups, payload.name, {
                active: false,
                paths: [],
            });
        })

        EventBus.$on('DeleteGroup', payload => {
            this.$delete(this.groups, payload.name)
        });

        EventBus.$on('SelectGroup', payload => {
            const newArr = this.groups[payload.name].paths.map(path => {
                path.active = payload.checked;
                return path;
            });

            this.$set(this.groups[payload.name], 'paths', newArr);
        });
    },

    watch: {
        groups: {
            handler() {
                this.save();
            },
            deep: true,
        }
    },

    methods: {
        save() {
            console.log('SAVING');
            localStorage.setItem('data', JSON.stringify(this.groups));
        },
    },

    components: {
        PathForm,
        PathList,
        GroupTitle,
        GroupForm,
    }
}
</script>
