'use strict';


window.util = (function () {
  var ESC_KEYCODE = 27;

  function getRandomInteger(min, max) {
    var random = min + Math.random() * (max + 1 - min);
    random = Math.floor(random);

    return random;
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  return {
    getRandomInteger: getRandomInteger,
    isEscEvent: isEscEvent
  };
})();
