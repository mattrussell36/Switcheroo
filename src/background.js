import RuleMatcher from './RuleMatcher';
import RulesService from './RulesService';

const service = RulesService.getRulesService();
const rules = service.get();
window.rules = rules;
const ruleMatcher = new RuleMatcher(rules);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return ruleMatcher.redirectOnMatch(details);
    },
    {
        urls : ['<all_urls>']
    },
    ['blocking']
);
