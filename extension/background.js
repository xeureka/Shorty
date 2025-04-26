const popupHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 320px;
      min-height: 150px;
      margin: 0;
      padding: 15px;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    button {
      background: #0066cc;
      color: white;
      border: none;
      padding: 12px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 14px;
      width: 100%;
    }
    #result {
      width: 100%;
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    #short-url {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 13px;
      min-width: 200px;
    }
    #copy-btn {
      width: auto;
      padding: 8px 15px;
    }
    .hidden {
      display: none !important;
    }
  </style>
</head>
<body>
  <div class="container">
    <button id="shorten-btn">Shorten Current URL</button>
    <div id="result" class="hidden">
      <input type="text" id="short-url" readonly>
      <button id="copy-btn">Copy</button>
    </div>
  </div>
</body>
</html>
`;

// Create popup behavior with proper sizing
chrome.action.onClicked.addListener(async (tab) => {
  await chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 350,
    height: 200,
    left: Math.round(screen.availWidth / 2 - 175), // Center horizontally
    top: Math.round(screen.availHeight / 2 - 100) // Center vertically
  });
});

// Handle popup.html requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url === 'chrome-extension://' + chrome.runtime.id + '/popup.html') {
      return { redirectUrl: 'data:text/html,' + encodeURIComponent(popupHTML) };
    }
    if (details.url === 'chrome-extension://' + chrome.runtime.id + '/popup.js') {
      return { redirectUrl: 'data:text/javascript,' + encodeURIComponent(popupJS) };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);