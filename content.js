let enabled = false;
let skinURL = 'https://example.com/my_skin.png'; // Replace with your PNG URL

function applySkin() {
    if (window.player && window.player.setSkin) {
        if (enabled) {
            window.player.setSkin(skinURL);
        } else {
            window.player.resetSkin();
        }
    } else {
        setTimeout(applySkin, 1000);
    }
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'toggleSkin') {
        enabled = !enabled;
        applySkin();
    }
});
