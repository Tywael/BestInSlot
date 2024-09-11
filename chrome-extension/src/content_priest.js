import { extractBiSData } from './extractors.js';

const subclasses = ['discipline', 'holy', 'shadow'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'priest';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}