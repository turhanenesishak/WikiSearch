function saveOptions() {
  const language = document.getElementById('language').value;
  const enableImageSearch = document.getElementById('enableImageSearch').checked;
  
  chrome.storage.sync.set({
    language: language,
    enableImageSearch: enableImageSearch
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    language: 'tr',
    enableImageSearch: true
  }, (items) => {
    document.getElementById('language').value = items.language;
    document.getElementById('enableImageSearch').checked = items.enableImageSearch;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('language').addEventListener('change', saveOptions);
document.getElementById('enableImageSearch').addEventListener('change', saveOptions); 