'use strict';


window.map = (function () {
  var randomizeWithGivenSize = window.util.randomizeWithGivenSize;
  var getIndexesOfEqualElements = window.util.getIndexesOfEqualElements;
  var showMapPins = window.pins.showMapPins;
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var ticketPopups;
  var ticketPopupCloseButtons;
  var userFormDisabledParts = document.querySelectorAll('.notice__form--disabled');
  var mapPinsFiltersContainer = document.querySelector('.map__filters');
  var userPin = map.querySelector('.map__pin--main');
  var mapPins;
  var address = document.querySelector('input[name="address"]');
  var MAP_WIDTH = 1200;
  var USER_PIN_TOP_LOCATION_CORRECTION = 32 + 16;// button = 65 / 2, pseudo = 22 - 6(transform)
  var MIN_LOCATION_Y = 100 + USER_PIN_TOP_LOCATION_CORRECTION;
  var MAX_LOCATION_Y = 500 + USER_PIN_TOP_LOCATION_CORRECTION;
  var MIN_LOCATION_X = 32;//  halfway button width
  var MAX_LOCATION_X = MAP_WIDTH - MIN_LOCATION_X;
  var USER_PIN_START_X = 600;
  var USER_PIN_START_Y = 375;
  var startCoords = {};
  var currentCoords = {
    x: USER_PIN_START_X,
    y: USER_PIN_START_Y
  };
  var SHOWN_TICKETS_QUANTITY = 5;
  var DELAY_TIME = 500;
  var advertismentTickets;
  var shownTickets;

  userPin.addEventListener('mousedown', onUserPinMouseDown);
  mapPinsFiltersContainer.addEventListener('change', function () {
    window.util.debounce(filterTickets, DELAY_TIME);
  });

  window.backend.load(onDataLoad, onDataLoadError);

  function onDataLoadError(errorMessage) {
    var warning = window.statusMessages.errorMessage(errorMessage);
    document.querySelector('body').appendChild(warning);
  }

  function onDataLoad(data) {
    advertismentTickets = data.slice();
    window.pins.createMapPins(advertismentTickets, mapPinsContainer);
    window.cards(advertismentTickets, map);
    mapPins = map.querySelectorAll('.map__pin');
    userPin.addEventListener('mousedown', activateMap);
    shownTickets = getShownTickets(data);
  }

  function getShownTickets(data) {
    var tickets = data;

    return randomizeWithGivenSize(SHOWN_TICKETS_QUANTITY, tickets);
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

  function showPins() {
    var shownTicketsIndexes = getIndexesOfEqualElements(advertismentTickets, shownTickets);
    showMapPins(shownTicketsIndexes, mapPins);
  }

  function toggleTicket(evt) {
    closeTicket();

    window.showCard.showTicket(evt, mapPins, ticketPopups, onPopupEscPress);
  }

  function activateMap() {
    removeMapFading();
    showPins();
    enableUserForm();
    ticketPopups = map.querySelectorAll('.popup');
    ticketPopupCloseButtons = map.querySelectorAll('.popup__close');
    userPin.removeEventListener('mouseup', activateMap);
    mapPinsContainer.addEventListener('click', toggleTicket);
    for (var i = 0; i < ticketPopups.length; i++) {
      ticketPopupCloseButtons[i].addEventListener('click', closeTicket);
    }
  }

  function filterTickets() {
    closeTicket();
    var filteredTickets = window.cardsFilters(advertismentTickets);

    if (filteredTickets.length > SHOWN_TICKETS_QUANTITY) {
      filteredTickets = randomizeWithGivenSize(SHOWN_TICKETS_QUANTITY, filteredTickets);
    }

    var filteredTicketsIndexes = getIndexesOfEqualElements(advertismentTickets, filteredTickets);

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].classList.add('hidden');
    }

    showMapPins(filteredTicketsIndexes, mapPins);
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

  function getUserPinLocation() {
    return {
      x: userPin.offsetLeft,
      y: userPin.offsetTop + USER_PIN_TOP_LOCATION_CORRECTION
    };
  }

  function setAddressValue() {
    var userPinAddress = getUserPinLocation();
    address.value = userPinAddress.x + ', ' + (userPinAddress.y + USER_PIN_TOP_LOCATION_CORRECTION);
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

  return {
    getUserPinLocation: getUserPinLocation,
    address: address,
    userPin: userPin
  };
})();
