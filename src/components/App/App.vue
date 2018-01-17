<template>
    <div>
        <h1>Switcheroo</h1>
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
        };
    },

    created() {
        this.rules = chrome.extension.getBackgroundPage().rules;

        EventBus.$on('AddRule', payload => {
            this.rules.push(payload);
        });

        EventBus.$on('RemoveRule', id => {
            const index = this.rules.findIndex(rule => rule.id === id);
            this.rules.splice(index, 1);
        });
    },

    watch: {
        rules() {
            set('rules', this.rules);
        },
    },

    components: {
        RuleTable,
        RuleForm,
    }
}
</script>
