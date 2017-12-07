'use strict';


window.map = (function () {
  var map = window.pins.map;
  var ticketPopups;
  var ticketPopupCloseButtons;
  var userFormDisabledParts = document.querySelectorAll('.notice__form--disabled');
  var userPin = map.querySelector('.map__pin--main');
  var mapPins;
  // displayMapPins();
  // var displayMapPins = window.pins.displayMapPins;

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
    var USER_PIN_START_X = 600;
    var USER_PIN_START_Y = 375;
    removeMapFading();
    displayMapPins();
    enableUserForm();
    ticketPopups = map.querySelectorAll('.popup');
    ticketPopupCloseButtons = map.querySelectorAll('.popup__close');
    mapPins = map.querySelectorAll('.map__pin');
    userPin.removeEventListener('mouseup', onUserPinMouseup);
    userPin.style.top = USER_PIN_START_Y + 'px';
    userPin.style.left = USER_PIN_START_X + 'px';
    window.pins.mapPinsContainer.addEventListener('click', toggleTicket);
    for (var i = 0; i < ticketPopups.length; i++) {
      ticketPopupCloseButtons[i].addEventListener('click', closeTicket);
    }
  }

  userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var MAP_WIDTH = 1200;
    var USER_PIN_TOP_LOCATION_CORRECTION = 32 + 16;// button = 65 / 2, pseudo = 22 - 6(transform)
    var MIN_LOCATION_Y = 100;
    var MAX_LOCATION_Y = 500;
    var MIN_LOCATION_X = 32;//  halfway button width
    var MAX_LOCATION_X = MAP_WIDTH - MIN_LOCATION_X;
    var BORDER_BOUNCE = 15;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var address = document.querySelector('input[name="address"]');

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

      if (userPin.offsetTop < MIN_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION) {
        userPin.style.top = MIN_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION + BORDER_BOUNCE + 'px';
        onUserPinBorderOut();
      } else if (userPin.offsetTop > MAX_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION) {
        userPin.style.top = MAX_LOCATION_Y - USER_PIN_TOP_LOCATION_CORRECTION - BORDER_BOUNCE + 'px';
        onUserPinBorderOut();
      }
      if (userPin.offsetLeft < MIN_LOCATION_X) {
        userPin.style.left = MIN_LOCATION_X + BORDER_BOUNCE + 'px';
        onUserPinBorderOut();
      } else if (userPin.offsetLeft > MAX_LOCATION_X) {
        userPin.style.left = MAX_LOCATION_X - BORDER_BOUNCE + 'px';
        onUserPinBorderOut();
      }
      userPin.style.top = (userPin.offsetTop - shift.y) + 'px';
      userPin.style.left = (userPin.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      address.value = parseInt(userPin.style.left, 10) + ', ' + (parseInt(userPin.style.top, 10) + USER_PIN_TOP_LOCATION_CORRECTION);
      window.pins.mapPinsContainer.removeEventListener('mousemove', onMouseMove);
      window.pins.mapPinsContainer.removeEventListener('mouseup', onMouseUp);
    }

    function onUserPinBorderOut() {
      address.value = parseInt(userPin.style.left, 10) + ', ' + (parseInt(userPin.style.top, 10) + USER_PIN_TOP_LOCATION_CORRECTION);
      window.pins.mapPinsContainer.removeEventListener('mousemove', onMouseMove);
      window.pins.mapPinsContainer.removeEventListener('mouseup', onMouseUp);
    }

    window.pins.mapPinsContainer.addEventListener('mousemove', onMouseMove);
    window.pins.mapPinsContainer.addEventListener('mouseup', onMouseUp);
  });
})();
