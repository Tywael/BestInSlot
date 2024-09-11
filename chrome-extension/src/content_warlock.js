import { extractBiSData } from './extractors.js';

const subclasses = ['affliction', 'demonology', 'destruction'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'warlock';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}