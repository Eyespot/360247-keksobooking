'use strict';


window.util = (function () {
  var ESC_KEYCODE = 27;
  var INDEX_SYNCHRONIZATION_VALUE = 1;
  var USER_PIN_TOP_LOCATION_CORRECTION = 32 + 16;// button = 65 / 2, pseudo = 22 - 6(transform)

  var previousTimeout = null;

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
    checkBrowser: checkBrowser,
    INDEX_SYNCHRONIZATION_VALUE: INDEX_SYNCHRONIZATION_VALUE,
    USER_PIN_TOP_LOCATION_CORRECTION: USER_PIN_TOP_LOCATION_CORRECTION
  };
})();
