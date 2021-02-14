function getRadioSelection(elementName) {
  var radios = document.getElementsByName(elementName);
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}

function setRadioSelection(elementName, selection) {
  const selector = `input[name="${elementName}"][value="${selection}"]`;
  document.querySelector(selector).checked = true
}

const OPTIONS = {
  ORIENTATION: 'orientation'
};

function save_options() {
  const clueOrientation = getRadioSelection(OPTIONS.ORIENTATION);

  chrome.storage.sync.set({
    clueOrientation: clueOrientation
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved. Please reload your puzzle for them to take effect.';
    setTimeout(function() {
      status.textContent = '';
    }, 3250);
  });

  chrome.runtime.sendMessage({type: "optionsUpdate"}, function(response) {
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    clueOrientation: 'horizontal',
  }, function(items) {
    setRadioSelection(OPTIONS.ORIENTATION, items.clueOrientation);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save')
  .addEventListener('click', save_options);