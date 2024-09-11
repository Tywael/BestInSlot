import { extractBiSData } from './extractors.js';

const subclasses = ['balance', 'feral', 'guardian', 'restoration'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'druid';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}