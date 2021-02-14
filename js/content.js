function applyOptions(items) {
  const clueOrientation = items.clueOrientation;
  const selector = "div[class^='ClueList-wrapper']";
  if (clueOrientation === 'vertical') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(e => {
      e.classList.remove('horizontal');
    });
  } else {
    const elements = document.querySelectorAll(selector);
    elements.forEach(e => {
      e.classList.add('horizontal');
    });
  }
}

function refreshOptions() {
  chrome.storage.sync.get({
    clueOrientation: 'horizontal',
  }, function (items) {
    applyOptions(items);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  refreshOptions();
});

refreshOptions();