import { extractBiSData } from './extractors.js';

const subclasses = ['protection', 'retribution', 'holy'];

let subclassData = extractBiSData(subclasses);
if (subclassData) {
    subclassData.class = 'paladin';
    chrome.runtime.sendMessage({ action: 'saveSubclass', data: subclassData });
}