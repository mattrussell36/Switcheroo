<template>
    <div>
        <h1>{{ title }} !!!</h1>
        <rule-table :rules="rules" />
        <rule-form />
    </div>
</template>
<script>
// TODO: Write tests for components
import { EventBus } from './../../EventBus';
import { get, set } from './../../Storage';
import RuleForm from './../RuleForm/RuleForm.vue';
import RuleTable from './../RuleTable/RuleTable.vue';

export default {
    data() {
        return {
            rules: [],

            title: 'Switcheroo',
            groups: null,
            activeGroup: null,
            showText: 'Show',
            hideText: 'Hide',
        };
    },

    created() {
        this.rules = chrome.extension.getBackgroundPage().rules;

        EventBus.$on('AddRule', payload => {
            this.rules.push(payload);
        });

        EventBus.$on('RemoveRule', id => {
            const rules = this.rules.filter(rule => id !== rule.id);

            this.rules = rules;
        });
    },

    watch: {
        rules: {
            handler() {
                console.log('saving');
                set('rules', this.rules);
            },
            deep: true,
        },
    },

    components: {
        RuleTable,
        RuleForm,
    }
}
</script>
