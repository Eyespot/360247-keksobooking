'use strict';


(function () {
  var map = window.pins.map;
  var ticketPopups;
  var ticketPopupCloseButtons;
  var userFormDisabledParts = document.querySelectorAll('.notice__form--disabled');
  var userPin = map.querySelector('.map__pin--main');
  var address = document.querySelector('input[name="address"]');
  var mapPins;
  var MAP_WIDTH = 1200;
  var USER_PIN_TOP_LOCATION_CORRECTION = 32 + 16;// button = 65 / 2, pseudo = 22 - 6(transform)
  var MIN_LOCATION_Y = 100;
  var MAX_LOCATION_Y = 500;
  var MIN_LOCATION_X = 32;//  halfway button width
  var MAX_LOCATION_X = MAP_WIDTH - MIN_LOCATION_X;
  var USER_PIN_START_X = 600;
  var USER_PIN_START_Y = 375;
  var startCoords = {};
  var currentCoords = {
    x: USER_PIN_START_X,
    y: USER_PIN_START_Y
  };

  userPin.addEventListener('mouseup', onUserPinMouseup);
  userPin.addEventListener('mousedown', onUserPinMouseDown);

  function displayMapPins() {
    window.pins.displayMapPins();
  }

  function closeTicket() {
    window.showCard.closeTicket(mapPins, ticketPopups, onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closeTicket);
  }

  function removeMapFading() {
    map.classList.remove('map--faded');
  }

  function enableUserForm() {
    for (var i = 0; i < userFormDisabledParts.length; i++) {
      userFormDisabledParts[i].removeAttribute('disabled');
      userFormDisabledParts[i].classList.remove('notice__form--disabled');
    }
  }

  function toggleTicket(evt) {
    closeTicket();

    window.showCard.showTicket(evt, mapPins, ticketPopups, onPopupEscPress);
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

  function onUserPinMouseDown(evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    currentCoords = {
      x: userPin.offsetLeft - shift.x,
      y: userPin.offsetTop - shift.y
    };

    if (currentCoords.y < MIN_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION) {
      currentCoords.y = MIN_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION;
      userPinStopMoving();
    } else if (currentCoords.y > MAX_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION) {
      currentCoords.y = MAX_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION;
      userPinStopMoving();
    }
    if (currentCoords.x < MIN_LOCATION_X) {
      currentCoords.x = MIN_LOCATION_X;
      userPinStopMoving();
    } else if (currentCoords.x > MAX_LOCATION_X) {
      currentCoords.x = MAX_LOCATION_X;
      userPinStopMoving();
    }
    userPin.style.top = (currentCoords.y) + 'px';
    userPin.style.left = (currentCoords.x) + 'px';
  }

  function setAddressValue() {
    address.value = currentCoords.x + ', ' + (currentCoords.y + USER_PIN_TOP_LOCATION_CORRECTION);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    setAddressValue();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function userPinStopMoving() {
    setAddressValue();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
})();
