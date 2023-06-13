function deteyifyTextNodes(element) {
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = modifyText(node.nodeValue);
        }
    }
}

function isVisible(element) {
    let styles = window.getComputedStyle(element);
    let isVisible = styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0';
    return isVisible;
}

function deteyifyText(text, vowels, repl, any_letter) {
    let regexp = new RegExp(`(?!${repl})(${any_letter})(?:[${vowels}]|((?![${vowels}])${any_letter}))((?!${any_letter})|$)`, "iug");
    console.log(regexp);
    return text.replace(regexp, `$1$2${repl}$3`);
}

function modifyText(text) {
    text = deteyifyText(text, "аеиоуыэюяёь", "ей", "[ёа-я]");
    text = deteyifyText(text, "aeiouy", "ey", "(?!\\d)\\w");
    return text;
}

function deteyifyElement(element) {
    if (isVisible(element)) {
        deteyifyTextNodes(element);
        for (let inner of element.children) {
            deteyifyElement(inner);
        }
    }
}

if (typeof browser === "undefined") {
    var browser = chrome;
}

let deteyImagePath = browser.runtime.getURL("DETEY.jpg");

browser.runtime.onMessage.addListener((message) => {
    if (message === "deteyify") {
        deteyifyElement(document.body);
        const images = document.querySelectorAll("img");
        for (let image of images) {
            image.src = deteyImagePath;
        }
    }
});
