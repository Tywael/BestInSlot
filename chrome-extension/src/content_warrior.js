import { extractBiSData } from './extractors.js';

const subclasses = ['arms', 'fury', 'protection'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'warrior';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}