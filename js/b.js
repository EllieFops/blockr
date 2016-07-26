chrome.tabs.onUpdated.addListener(function( tabId, ignored, tab ) {
  if (tab.url && tab.url === "https://www.tumblr.com/dashboard") {
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
});
