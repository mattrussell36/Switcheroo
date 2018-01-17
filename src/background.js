import { get } from './Storage';
import requestHandler from './RequestHandler';

/// Add to background window object so that main App can
/// Get access with chrome.extension.getBackgroundPage().rules
window.rules = get('rules') || [];

chrome.webRequest.onBeforeRequest.addListener(
    details => requestHandler(details, rules),
    { urls : ['<all_urls>'] },
    ['blocking']
);

