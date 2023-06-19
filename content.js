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

function makeReplacer(vowels, repl, alphabet, replEnd) {
    let regexp = new RegExp(
        `(?!${repl})` // Excluding words that already end with "ey"
        + `(?:`
        + `(?<firstLetter1>[${alphabet}])[${vowels}]` // Either a letter and a vowel
        + `|` // or
        + `[${vowels}]${replEnd}` // an ending that looks similar to "ey"
        + `|` // or
        + `(?<firstLetter2>[${alphabet}])(?<consonant>(?![${vowels}])[${alphabet}])` // a letter an a consonant (which has to be saved, so it's grouped)
        + `)` // The end of the word ending's letters
        + `(?<after>[^${alphabet}]|$)`, // The end of the word (something after the word)
        "iug" // case-Insensitive, matching Unicode, Global (don't return after first match)
    );
    console.log(regexp);
    return (text) => text.replace(regexp, `$<firstLetter1>$<firstLetter2>$<consonant>${repl}$<after>`);
}

let ruReplacer = makeReplacer("аеиоуыэюяёь", "ей", "ёа-я", "й");
let enReplacer = makeReplacer("aeiouy", "ey", "a-z", "y");

function modifyText(text) {
    return ruReplacer(enReplacer(text));
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
