function applyOptions(items) {
  const clueOrientation = items.clueOrientation;
  const selector = "section[class^='xwd__layout--cluelists']";
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
    setTimeout(() => {
      applyOptions(items);
    }, 1000);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  refreshOptions();
});

refreshOptions();