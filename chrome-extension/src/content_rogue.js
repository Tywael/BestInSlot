import { extractBiSData } from './extractors.js';

const subclasses = ['assassination', 'outlaw', 'subtlety'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'rogue';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}