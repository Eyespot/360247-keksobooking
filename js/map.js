'use strict';


window.map = (function () {
  var map = window.pins.map;
  var ticketPopups;
  var ticketPopupCloseButtons;
  var userFormDisabledParts = document.querySelectorAll('.notice__form--disabled');
  var userPin = map.querySelector('.map__pin--main');
  var mapPins;

  userPin.addEventListener('mouseup', onUserPinMouseup);

  function displayMapPins() {
    window.pins.displayMapPins();
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closeTicket);
  }

  function removeMapFading() {
    map.classList.remove('map--faded');
  }

  function closeTicket() {
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].classList.remove('map__pin--active');
    }
    for (var j = 0; j < ticketPopups.length; j++) {
      ticketPopups[j].classList.add('hidden');
    }
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function enableUserForm() {
    for (var i = 0; i < userFormDisabledParts.length; i++) {
      userFormDisabledParts[i].removeAttribute('disabled');
      userFormDisabledParts[i].classList.remove('notice__form--disabled');
    }
  }

  function toggleTicket(evt) {
    var target;
    var clickedButtonIndex;
    target = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    for (var i = 0; i < ticketPopups.length; i++) {
      ticketPopups[i].classList.add('hidden');
    }
    for (var j = 0; j < mapPins.length; j++) {
      mapPins[j].classList.remove('map__pin--active');
    }
    if (target.className !== 'map__pin') {
      document.removeEventListener('keydown', onPopupEscPress);
      return;
    }
    for (var k = 1; k < mapPins.length; k++) {
      if (target === mapPins[k]) {
        clickedButtonIndex = k;
        ticketPopups[clickedButtonIndex - 1].classList.remove('hidden');
        mapPins[clickedButtonIndex].classList.add('map__pin--active');
      }
    }
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onUserPinMouseup() {
    removeMapFading();
    displayMapPins();
    enableUserForm();
    ticketPopups = map.querySelectorAll('.popup');
    ticketPopupCloseButtons = map.querySelectorAll('.popup__close');
    mapPins = map.querySelectorAll('.map__pin');
    userPin.removeEventListener('mouseup', onUserPinMouseup);
    window.pins.mapPinsContainer.addEventListener('click', toggleTicket);
    for (var i = 0; i < ticketPopups.length; i++) {
      ticketPopupCloseButtons[i].addEventListener('click', closeTicket);
    }
  }
})();
