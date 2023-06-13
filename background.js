if (typeof browser === "undefined") {
    var browser = chrome;
}

browser.action.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, "deteyify");
    });
});
