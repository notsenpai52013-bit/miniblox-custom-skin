chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    if (
      tab.url.includes("miniblox.online") ||
      tab.url.includes("crazygames.com")
    ) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"]
      });
    }
  }
});
