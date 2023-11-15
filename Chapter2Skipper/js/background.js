chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.indexOf("https://www.youtube.com/watch") > -1) {
    chrome.scripting.executeScript({
      target: {tabId: tabId, allFrames: false},
      files: ['js/content_script.js'],
    });
  }
});
