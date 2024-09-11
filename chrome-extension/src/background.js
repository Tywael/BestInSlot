const allClasses = [
  'deathknight', 'demonhunter', 'druid', 'evoker', 'hunter', 
  'mage', 'monk', 'paladin', 'priest', 'rogue', 'shaman', 
  'warlock', 'warrior'
];


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.get(tabId, (updatedTab) => {
            if (updatedTab.url) {
                for (const className of allClasses) {
                    if (updatedTab.url.includes(className)) {
                        chrome.scripting.executeScript({
                            target: { tabId: tabId },
                            files: [`dist/content_${className}.bundle.js`]
                        });
                        break;
                    }
                }
            } else {
                console.log('Tab URL is undefined');
            }
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveSubclass') {
        chrome.storage.local.get('bisData', (result) => {
            let bisData = result.bisData || [];
            let classIndex = bisData.findIndex((c) => c["class"] === request.data["class"]);
            let subclassData = { ...request.data };
            let classe = subclassData["class"];
            delete subclassData["class"];
            if (classIndex === -1) {
                bisData.push({
                    "class": classe,
                    subclasses: [subclassData]
                });
            } else {
                let subclassIndex = bisData[classIndex].subclasses.findIndex((sc) => sc.subclass === request.data.subclass);
                if (subclassIndex === -1) {
                    bisData[classIndex].subclasses.push(subclassData);
                } else {
                    bisData[classIndex].subclasses[subclassIndex] = subclassData;
                }
            }
            chrome.storage.local.set({
                bisData: bisData
            }, () => {
                console.log('Subclass data saved');
            });
        });
    } else if (request.action === 'getBiSData') {
        chrome.storage.local.get('bisData', (result) => {
            sendResponse({
                data: result.bisData
            });
        });
        return true;
    }
});
