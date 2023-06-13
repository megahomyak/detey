function modifyTextNodes(element) {
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = modifyText(node.nodeValue);
        }
    }
}

function isVisible(element) {
    let styles = window.getComputedStyle(element);
    let isVisible = styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0';
    return isVisible
}

function replace(text, chars, repl) {
    let regexp = new RegExp(`[${chars}]+(?:(?=[^${chars}])[\\wёа-я])*([^\\wёа-я]|\\s|$)`, "iug");
    return text.replace(regexp, `${repl}$1`);
}

function modifyText(text) {
    text = replace(text, "аеиоуыэюяёь", "ей")
    text = replace(text, "aeiouy", "ey")
    return text
}

function processElement(element) {
    if (isVisible(element)) {
        modifyTextNodes(element);
        for (let inner of element.children) {
            processElement(inner);
        }
    }
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "processElement") {
        processElement(document.body);
    }
});
