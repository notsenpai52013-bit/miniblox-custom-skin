function injectInto(win) {
  const script = win.document.createElement('script');
  script.textContent = `
    (() => {
      const CUSTOM_SKIN_URL = 'https://t.novaskin.me/f86fda253940b102add31469dcc0167a3183d850388856b3111aed490fa7e14a';
      let USED = false;

      console.log('[Miniblox EXT] Injected');

      const desc = Object.getOwnPropertyDescriptor(
        HTMLImageElement.prototype,
        'src'
      );

      Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set(value) {
          if (
            !USED &&
            typeof value === 'string' &&
            /skin|player|character|avatar/i.test(value)
          ) {
            USED = true;
            console.log('[Miniblox EXT] ONLY ME skin replaced');
            return desc.set.call(this, CUSTOM_SKIN_URL);
          }
          return desc.set.call(this, value);
        },
        get() {
          return desc.get.call(this);
        }
      });
    })();
  `;
  win.document.documentElement.appendChild(script);
  script.remove();
}

const interval = setInterval(() => {
  const iframe = document.querySelector('iframe');
  if (iframe && iframe.contentWindow && iframe.contentDocument) {
    clearInterval(interval);
    injectInto(iframe.contentWindow);
  }
}, 500);
