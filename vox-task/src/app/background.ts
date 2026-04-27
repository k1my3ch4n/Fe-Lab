chrome.runtime.onInstalled.addListener((details) => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});
