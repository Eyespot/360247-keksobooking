'use strict';


window.pins = (function () {

  function createMapPins(advertismentTickets, mapPinsContainer) {
    var fragment = document.createDocumentFragment();
    var HALFWAY_PSEUDO_WIDTH = 5;
    var PSEUDO_HEIGHT = 18;
    var HALFWAY_MAP_PIN_HEIGHT = 22;

    for (var i = 0; i < advertismentTickets.length; i++) {
      var newPin = document.createElement('button');

      newPin.style = 'left: ' + (advertismentTickets[i].location.x - HALFWAY_PSEUDO_WIDTH) + 'px; top: ' + (advertismentTickets[i].location.y - (HALFWAY_MAP_PIN_HEIGHT + PSEUDO_HEIGHT)) + 'px;';
      newPin.className = 'map__pin hidden';
      newPin.innerHTML = '<img src="' + advertismentTickets[i].author.avatar + '" width="40" height="40" draggable="false"></button>';

      fragment.appendChild(newPin);
    }

    mapPinsContainer.appendChild(fragment);
  }

  function showMapPins(arrayOfIndexes, mapPins) {

    mapPins.forEach(function (mapPin, i) {

      if (arrayOfIndexes.indexOf(i - 1) !== -1) {
        mapPin.classList.remove('hidden');
      }
    });
  }

  return {
    createMapPins: createMapPins,
    showMapPins: showMapPins
  };
})();
