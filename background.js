let currentLanguage = 'tr';
let enableImageSearch = true;

chrome.storage.sync.get({
  language: 'tr',
  enableImageSearch: true
}, (items) => {
  currentLanguage = items.language;
  enableImageSearch = items.enableImageSearch;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.language) {
    currentLanguage = changes.language.newValue;
  }
  if (changes.enableImageSearch) {
    enableImageSearch = changes.enableImageSearch.newValue;
    updateContextMenus();
  }
});

chrome.contextMenus.create({
  id: "wikiSearch",
  title: "WikiSearch: '%s'",
  contexts: ["selection"]
});

function updateContextMenus() {
  chrome.contextMenus.remove("wikiImageSearch", () => {
    if (enableImageSearch) {
      chrome.contextMenus.create({
        id: "wikiImageSearch",
        title: "WikiSearch: Search Image",
        contexts: ["image"]
      });
    }
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "wikiSearch") {
    const searchQuery = encodeURIComponent(info.selectionText);
    const wikiUrl = `https://${currentLanguage}.wikipedia.org/wiki/Special:Search?search=${searchQuery}`;
    chrome.tabs.create({ url: wikiUrl });
  } 
  else if (info.menuItemId === "wikiImageSearch") {
    const imageUrl = encodeURIComponent(info.srcUrl);
    const wikiUrl = `https://${currentLanguage}.wikipedia.org/wiki/Special:Search?search=${imageUrl}&ns6=1`;
    chrome.tabs.create({ url: wikiUrl });
  }
});

updateContextMenus(); 