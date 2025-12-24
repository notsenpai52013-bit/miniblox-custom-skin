document.getElementById("save").onclick = async () => {
  const url = document.getElementById("url").value.trim();
  if (!url) {
    alert("Paste skin URL first");
    return;
  }

  await chrome.storage.local.set({ skinUrl: url });

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.reload(tab.id);
};
