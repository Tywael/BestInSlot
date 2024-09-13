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
            fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bisData: bisData })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Subclass data sent to server:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
