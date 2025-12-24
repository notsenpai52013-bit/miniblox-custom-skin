(async () => {
  const { skinUrl } = await chrome.storage.local.get("skinUrl");
  if (!skinUrl) {
    console.log("[Skin] No URL saved");
    return;
  }

  console.log("[Skin] Loaded:", skinUrl);

  const OriginalImage = window.Image;

  window.Image = function () {
    const img = new OriginalImage();
    Object.defineProperty(img, "src", {
      set(value) {
        if (
          typeof value === "string" &&
          /skin|player|character|avatar/i.test(value)
        ) {
          console.log("[Skin] Replaced");
          value = skinUrl;
        }
        HTMLImageElement.prototype.src.set.call(img, value);
      }
    });
    return img;
  };
})();
