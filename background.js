browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { command: "processElement" });
    });
});
