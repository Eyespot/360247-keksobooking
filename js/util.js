'use strict';


window.util = (function () {
  var previousTimeout = null;
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

  function randomizeWithGivenSize(size, array) {
    var arrayCopy = array.slice();
    var tickets = [];

    for (var i = 0; i < size; i++) {
      var j = getRandomInteger(0, arrayCopy.length - 1);
      tickets.push(arrayCopy[j]);
      arrayCopy.splice(j, 1);
    }

    return tickets;
  }

  function getIndexesOfEqualElements(bigArray, smallArray) {
    var indexes = [];

    bigArray.forEach(function (ticket, i) {

      if (smallArray.indexOf(ticket) !== -1) {
        indexes.push(i);
      }
    });

    return indexes;
  }

  function debounce(callback, delayTime) {

    if (previousTimeout) {
      window.clearTimeout(previousTimeout);
    }
    previousTimeout = window.setTimeout(callback, delayTime);
  }

  function checkBrowser() {
    var ua = navigator.userAgent;
    console.log(ua);

    if (ua.search(/Chrome/) > 0) {
      return 'Google Chrome';
    }

    if (ua.search(/Firefox/) > 0) {
      return 'Firefox';
    }

    if (ua.search(/Safari/) > 0) {
      return 'Safari';
    }

    if (ua.search(/Edge/) > 0) {
      return 'Edge';
    }

    return 'Не определен';
  }

  return {
    getRandomInteger: getRandomInteger,
    isEscEvent: isEscEvent,
    randomizeWithGivenSize: randomizeWithGivenSize,
    getIndexesOfEqualElements: getIndexesOfEqualElements,
    debounce: debounce,
    checkBrowser: checkBrowser
  };
})();
