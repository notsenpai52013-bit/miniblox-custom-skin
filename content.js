const CUSTOM_SKIN_URL = "https://YOUR_SKIN_LINK.png";
let enabled = false;

// Listen to popup toggle
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggleSkin") {
        enabled = !enabled;
        console.log("[SkinExtension] Enabled:", enabled);
    }
});

// Hook Image loading
const OriginalImage = window.Image;

window.Image = function (...args) {
    const img = new OriginalImage(...args);

    Object.defineProperty(img, "src", {
        set(value) {
            // Detect YOUR OWN skin (Miniblox usually uses player UUID)
            if (enabled && typeof value === "string" && value.includes("skin")) {
                console.log("[SkinExtension] Replacing skin:", value);
                return img.setAttribute("src", CUSTOM_SKIN_URL);
            }
            return img.setAttribute("src", value);
        }
    });

    return img;
};
