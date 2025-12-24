(async () => {
  const data = await chrome.storage.local.get("skinUrl");
  if (!data.skinUrl) return;

  const CUSTOM_SKIN = data.skinUrl;

  console.log("[Miniblox Skin] Using:", CUSTOM_SKIN);

  // Intercept Image loading (WebGL / Canvas)
  const originalImage = window.Image;
  window.Image = function () {
    const img = new originalImage();
    Object.defineProperty(img, "src", {
      set(value) {
        if (
          typeof value === "string" &&
          /skin|player|character|avatar/i.test(value)
        ) {
          console.log("[Skin Replaced]");
          value = CUSTOM_SKIN;
        }
        img.setAttribute("data-src", value);
        HTMLImageElement.prototype.src.set.call(img, value);
      }
    });
    return img;
  };

})();
