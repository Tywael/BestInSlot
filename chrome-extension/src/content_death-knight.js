import { extractBiSData } from './extractors.js';

const subclasses = ['blood', 'frost', 'unholy'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'death-knight';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}
