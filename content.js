let enabled = false;
let skinURL = 'https://t.novaskin.me/f86fda253940b102add31469dcc0167a3183d850388856b3111aed490fa7e14a'; // Replace with your PNG URL

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
