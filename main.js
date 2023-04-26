function modifyParagraph(node) {
    console.log(node);
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = modifyText(node.textContent);
    } else {
        for (let child of node.childNodes) {
            modifyParagraph(child);
        }
    }
}

function modifyTextNodes(node) {
    if (node.tagName == "p") {
        modifyParagraph(node);
    } else {
        for (let child of node.childNodes) {
            modifyTextNodes(child);
        }
    }
}

function modifyText(text) {
    return "yay";
    // Split text into words
    const words = text.split(/\b/);

    // Modify each word
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (/[аеиоуыэюя]/i.test(word)) {
            // Find the last vowel
            const lastVowel = word.lastIndexOf(/[аеиоуыэюя]/i);

            // Replace everything after the last vowel with "ей"
            words[i] = word.slice(0, lastVowel + 1) + 'ей' + word.slice(lastVowel + 1).replace(/[^\s]+/g, '');
        }
    }

    // Join modified words back into text
    return words.join('');
}

const observer = new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (let node of mutation.addedNodes) {
                modifyTextNodes(node);
            }
        }
    }
});

observer.observe(document, { childList: true, subtree: true });
