(() => {
  'use strict';

  const CUSTOM_SKIN_URL = 'https://t.novaskin.me/f86fda253940b102add31469dcc0167a3183d850388856b3111aed490fa7e14a';
  let ENABLED = true;
  let USED = false;

  console.log('[Miniblox Skin EXT] Loaded');

  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'k') {
      ENABLED = !ENABLED;
      console.log('[Miniblox Skin EXT] Enabled:', ENABLED);
    }
  });

  const desc = Object.getOwnPropertyDescriptor(
    HTMLImageElement.prototype,
    'src'
  );

  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    set(value) {
      if (
        ENABLED &&
        !USED &&
        typeof value === 'string' &&
        /skin|player|character|avatar/i.test(value)
      ) {
        USED = true;
        console.log('[Miniblox Skin EXT] Replacing ONLY my skin');
        return desc.set.call(this, CUSTOM_SKIN_URL);
      }
      return desc.set.call(this, value);
    },
    get() {
      return desc.get.call(this);
    }
  });
})();
