document.getElementById('apply').onclick = () => {
  const url = document.getElementById('skinUrl').value.trim();
  if (!url) return alert('Paste a skin URL first');

  chrome.storage.local.set({ skinUrl: url }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
};
