document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('downloadBtn').addEventListener('click', () => {
    chrome.storage.local.get('bisData', (result) => {
      let bisData = result.bisData;
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bisData));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "bis_data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  });
});