chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('../index.html',
    {
      id: 'mainWindow',
      bounds: {width: 500, height: 600},
      minWidth: 500, minHeight: 600, frame: 'none'
    }
  );
});
