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

const observer = new MutationObserver(function(mutationsList, _observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    processElement(node);
                }
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
processElement(document.body);
