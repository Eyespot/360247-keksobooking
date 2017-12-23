'use strict';


window.map = (function () {
  var FADED_MAP_CLASS = 'map--faded';
  var DISABLED_FORM_CLASS = 'notice__form--disabled';
  var MAP_WIDTH = 1200;
  var USER_PIN_TOP_LOCATION_CORRECTION = window.util.USER_PIN_TOP_LOCATION_CORRECTION;
  var MIN_LOCATION_Y = 100 + USER_PIN_TOP_LOCATION_CORRECTION;
  var MAX_LOCATION_Y = 500 + USER_PIN_TOP_LOCATION_CORRECTION;
  var MIN_LOCATION_X = 32;//  halfway button width
  var MAX_LOCATION_X = MAP_WIDTH - MIN_LOCATION_X;
  var SHOWN_TICKETS_QUANTITY = 5;
  var DELAY_TIME = 500;

  var randomizeWithGivenSize = window.util.randomizeWithGivenSize;
  var getIndexesOfEqualElements = window.util.getIndexesOfEqualElements;
  var showPins = window.pins.show;
  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var ticketPopups;
  var ticketPopupCloseButtons;
  var userFormDisabledParts = document.querySelectorAll('.notice__form--disabled');
  var ticketsFiltersContainer = document.querySelector('.map__filters');
  var userPin = map.querySelector('.map__pin--main');
  var mapPins;
  var address = document.querySelector('input[name="address"]');
  var advertismentTickets;
  var shownTickets;
  var photosLists;
  var pictures = [];
  var startCoords = {};

  userPin.addEventListener('mousedown', onUserPinMouseDown);

  ticketsFiltersContainer.addEventListener('change', function onFilterChange() {
    window.util.debounce(filterTickets, DELAY_TIME);
  });

  window.backend.load(onDataLoad, onDataLoadError);

  function onCardPictureClick() {
    window.affectCard.flip(pictures);
  }

  function onDataLoadError(errorMessage) {
    var warning = window.statusMessages.reflectError(errorMessage);
    document.querySelector('body').appendChild(warning);
  }

  function onDataLoad(data) {

    if (window.util.checkBrowser() === 'Edge') {
      window.userForm.reset();
    }

    advertismentTickets = data.slice();
    window.pins.create(advertismentTickets, mapPinsContainer);
    window.cards(advertismentTickets, map);

    mapPins = Array.from(map.querySelectorAll('.map__pin'));

    photosLists = Array.from(document.querySelectorAll('.popup__pictures'));

    photosLists.forEach(function (list, i) {
      pictures[i] = (list.querySelectorAll('.popup__picture'));
    });

    userPin.addEventListener('mousedown', onUserPinMouseDownActivate);
    shownTickets = getShownTickets(data);
  }

  function getShownTickets(data) {
    var tickets = data;

    return randomizeWithGivenSize(SHOWN_TICKETS_QUANTITY, tickets);
  }

  function onTicketClose() {
    window.affectCard.hide(mapPins, ticketPopups, photosLists, onCardPictureClick, pictures, onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, onTicketClose);
  }

  function removeMapFading() {
    map.classList.remove(FADED_MAP_CLASS);
  }

  function enableUserForm() {
    for (var i = 0; i < userFormDisabledParts.length; i++) {
      userFormDisabledParts[i].disabled = false;
      userFormDisabledParts[i].classList.remove(DISABLED_FORM_CLASS);
    }
  }

  function displayPins() {
    var shownTicketsIndexes = getIndexesOfEqualElements(advertismentTickets, shownTickets);
    showPins(shownTicketsIndexes, mapPins);
  }

  function onMapAreaClick(evt) {
    onTicketClose();
    window.affectCard.show(evt, mapPins, ticketPopups, photosLists, onCardPictureClick, onPopupEscPress);
  }

  function onUserPinMouseDownActivate() {

    removeMapFading();
    displayPins();
    enableUserForm();

    ticketPopups = map.querySelectorAll('.popup');
    ticketPopupCloseButtons = map.querySelectorAll('.popup__close');

    userPin.removeEventListener('mousedown', onUserPinMouseDownActivate);
    mapPinsContainer.addEventListener('click', onMapAreaClick);

    for (var i = 0; i < ticketPopups.length; i++) {
      ticketPopupCloseButtons[i].addEventListener('click', onTicketClose);
    }
  }

  function filterTickets() {
    onTicketClose();
    var filteredTickets = window.filters(advertismentTickets);

    if (filteredTickets.length > SHOWN_TICKETS_QUANTITY) {
      filteredTickets = randomizeWithGivenSize(SHOWN_TICKETS_QUANTITY, filteredTickets);
    }

    var filteredTicketsIndexes = getIndexesOfEqualElements(advertismentTickets, filteredTickets);

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].classList.add('hidden');
    }

    showPins(filteredTicketsIndexes, mapPins);
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

    var currentCoords = {
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
    userPin: userPin,
    ticketsFiltersContainer: ticketsFiltersContainer,
    filterTickets: filterTickets,
    photosLists: photosLists
  };
})();
