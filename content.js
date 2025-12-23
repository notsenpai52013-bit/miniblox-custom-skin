(function () {
  chrome.storage.local.get('skinUrl', data => {
    if (!data.skinUrl) return;

    const SKIN_URL = data.skinUrl;
    let USED = false;

    function inject(win) {
      const s = win.document.createElement('script');
      s.textContent = `
        (() => {
          let USED = false;
          const SKIN = '${SKIN_URL}';
          const desc = Object.getOwnPropertyDescriptor(
            HTMLImageElement.prototype,
            'src'
          );

          Object.defineProperty(HTMLImageElement.prototype, 'src', {
            set(v) {
              if (
                !USED &&
                typeof v === 'string' &&
                /skin|player|character|avatar/i.test(v)
              ) {
                USED = true;
                console.log('[Miniblox EXT] Skin applied');
                return desc.set.call(this, SKIN);
              }
              return desc.set.call(this, v);
            },
            get() {
              return desc.get.call(this);
            }
          });
        })();
      `;
      win.document.documentElement.appendChild(s);
      s.remove();
    }

    const wait = setInterval(() => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        clearInterval(wait);
        inject(iframe.contentWindow);
      }
    }, 500);
  });
})();
