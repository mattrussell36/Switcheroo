import { get } from './Storage';

window.rules = get('rules') || [];

chrome.webRequest.onBeforeRequest.addListener(
    handleRequest,
    { urls : ['<all_urls>'] },
    ['blocking']
);

function handleRequest({ initiator, url }) {
    let regex;

    /// Find the rule
    const rule = rules.find(rule => {
        if (!rule.active) {
            return false;
        }

        regex = new RegExp(rule.from, 'g');
        return regex.test(url);
    });

    if (rule) {
        return {
            redirectUrl: url.replace(regex, rule.to),
        };
    }
}