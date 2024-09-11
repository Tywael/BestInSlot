import { extractBiSData } from './extractors.js';

const subclasses = ['vengeance', 'havoc'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'demon-hunter';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}
