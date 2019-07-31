function checkTab(newTab) {
    // Mke sure the url is a website (So we don't close the new tab page, settings, etc)
    if (newTab && newTab.url && newTab.url.match("^https?:") == null) return;

    chrome.tabs.query({}, function (tabs) { // Query all tabs

        for (let tab of tabs) {  // Loop through them
            if (tab.url == newTab.url && tab.id != newTab.id) { // If the url of the new one matches an existing one
                chrome.tabs.update(tab.id, { active: true }); // Make the existing tab active
                chrome.tabs.remove(newTab.id);  // Remove the new tab)
            }
        }
    });
}

chrome.tabs.onCreated.addListener(checkTab);
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => checkTab({ id: tabId, url: changeInfo.url }));