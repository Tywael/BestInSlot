import { extractBiSData } from './extractors.js';

const subclasses = ['brewmaster', 'mistweaver', 'windwalker'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'monk';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}