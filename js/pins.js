'use strict';


window.pins = (function () {
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var advertismentTickets = window.dataStack.advertismentTickets;

  function displayMapPins() {
    var Fragment = document.createDocumentFragment();
    var IMPOSITION_ERROR = 4;
    var HALFWAY_MAP_PIN_IMG_HEIGHT = 23;
    var PSEUDO_BULDGE = 16;

    for (var i = 0; i < advertismentTickets.length; i++) {
      var newPin = document.createElement('button');
      newPin.style = 'left: ' + (advertismentTickets[i].location.x - IMPOSITION_ERROR) + 'px; top: ' + (advertismentTickets[i].location.y - (HALFWAY_MAP_PIN_IMG_HEIGHT + PSEUDO_BULDGE)) + 'px;';
      newPin.className = 'map__pin';
      newPin.innerHTML = '<img src="' + advertismentTickets[i].author.avatar + '" width="40" height="40" draggable="false"></button>';

      Fragment.appendChild(newPin);
    }

    mapPinsContainer.appendChild(Fragment);
  }

  return {
    map: map,
    mapPinsContainer: mapPinsContainer,
    displayMapPins: displayMapPins
  };
})();
