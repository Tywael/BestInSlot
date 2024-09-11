import { extractBiSData } from './extractors.js';

const subclasses = ['frost', 'fire', 'arcane'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'mage';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}