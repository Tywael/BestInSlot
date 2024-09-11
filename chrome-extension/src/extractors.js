export function extractItems(buildIndex) {
    let bisItems = [];
    let area = document.getElementById(`area_${buildIndex}`);
    if (area) {
        let items = area.querySelectorAll('.q4');
        items.forEach((item, index) => {
            bisItems.push({
                id: index + 1,
                text: item.innerText
            });
        });
    }
    return bisItems;
}

export function extractBuilds() {
    let builds = [];
    let area = document.querySelector('.image_block')
    let buttons = area.querySelectorAll('[id^="area_"][id$="_button"]');

    buttons.forEach(button => {
        let idParts = button.id.split('_');
        let buildIndex = idParts[1];

        let buildName = button.innerText.trim();
        builds.push({
            build: buildName,
            items: extractItems(buildIndex)
        });
    });
    return builds;
}

export function extractBiSData(subclasses) {
    let subclassData;
    subclasses.forEach(subclass => {
        let data = null;
        if (document.URL.includes(subclass)) {
            data = {
                subclass: subclass,
                builds: extractBuilds()
            };
            subclassData = data;
        }
    });
    return subclassData;
}

