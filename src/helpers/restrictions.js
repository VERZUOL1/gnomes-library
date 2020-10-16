export function clickIE() {
  return !document.all;
}

export function clickNS(e) {
  if (document.layers || (document.getElementById && !document.all)) {
    if (e.which === 2 || e.which === 3) {
      return false;
    }
  }
  return true;
}

export function setClick() {
  if (document.layers) {
    // eslint-disable-next-line no-undef
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
  } else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
  }
}

export function handler(event) {
  if (event.scale !== undefined && event.scale !== 1) {
    event.preventDefault();
  }
}
export function restrictTouch() {
  // eslint-disable-next-line no-new-func
  document.oncontextmenu = new Function('return false');
  // eslint-disable-next-line func-names
  document.getElementsByTagName('img').ondragstart = function () { return false; };

  // disable pinch zoom on ipad
  window.addEventListener(
    'touchmove',
    handler,
    { passive: false }
  );
}

setClick();
restrictTouch();
