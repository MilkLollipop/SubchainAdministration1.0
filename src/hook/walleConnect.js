const event = document.createEvent('Event');
event.initEvent('wormHoles-callback-event', true, true);

document.addEventListener('wormHoles-callback-event', (res) => {
  let { type, response } = res.detail;
  window[type] ? window[type](response) : '';
});

export const handlerPostMessage = (opt) => {
  let { type, data, callback } = opt;
  window[`wallet-${type}-callback`] = callback;
  window.postMessage({ type, data }, '*');
};
