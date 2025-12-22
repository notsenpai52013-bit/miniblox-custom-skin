const script = document.createElement('script');
script.src = chrome.runtime.getURL('injector.js');
document.documentElement.appendChild(script);
script.remove();
