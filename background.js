if (typeof browser === "undefined") {
    var browserAction = chrome.action;
    var browser = chrome;
} else {
    var browserAction = browser.browserAction;
}

browserAction.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, "deteyify");
    });
});
