chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let status = 'unhandled';
    switch (request.type) {
      case 'optionsUpdate':
        status = 'success';
        break;
      default:
        response('unknown request');
        break;
    }

    sendResponse({status: status});
  });
