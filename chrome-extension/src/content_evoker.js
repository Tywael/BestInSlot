import { extractBiSData } from './extractors.js';

const subclasses = ['augmentation', 'devastation', 'preservation']

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'evoker';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}