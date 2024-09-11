import { extractBiSData } from './extractors.js';

const subclasses = ['elemental', 'enhancement', 'restoration'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'shaman';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}