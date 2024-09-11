import { extractBiSData } from './extractors.js';

const subclasses = ['beast-mastery', 'marksmanship', 'survival'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'hunter';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}