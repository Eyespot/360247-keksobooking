'use strict';


var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TIMES = ['12:00', '13:00', '14:00'];
var GIVEN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ESC_KEYCODE = 27;
var map = document.querySelector('.map');
var userPin = map.querySelector('.map__pin--main');
var mapPins;
var mapPinsContainer = map.querySelector('.map__pins');
var ticketPopups;
var ticketPopupCloseButtons;
var userFormDisabledParts = document.querySelectorAll('.notice__form--disabled');
var userFormElements = document.querySelectorAll('.form__element');
var roomsCapacitySelect = userFormElements[6].querySelector('select[name="capacity"]');
var roomsQuantitySelect = userFormElements[5].querySelector('select[name="rooms"]');
var timeInSelect = userFormElements[4].querySelector('select[name="timein"]');
var timeOutSelect = userFormElements[4].querySelector('select[name="timeout"]');
var housingPriceInput = userFormElements[3].querySelector('input[name="price"]');
var housingTypeSelect = userFormElements[2].querySelector('select[name="type"]');
var ticketTemplate = document.querySelector('template').content.querySelector('article.map__card');
var similarTickets = [];

getSimilarTickets();
appendTickets();

userPin.addEventListener('mouseup', onUserPinMouseup);

function getRandomInteger(min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
}

function getRandomAvatar() {
  var i = getRandomInteger(0, avatars.length - 1);
  var avatar = avatars.splice(i, 1);

  return avatar;
}

function getRandomTitle() {
  var i = getRandomInteger(0, titles.length - 1);
  var title = titles.splice(i, 1);

  return title;
}

function getRandomTime() {
  var i = getRandomInteger(0, TIMES.length - 1);
  var time = TIMES[i];

  return time;
}

function getFeatures() {
  var givenFeaturesCopy = GIVEN_FEATURES.slice();
  var size = getRandomInteger(0, givenFeaturesCopy.length);
  var features = [];
  for (var i = 0; i < size; i++) {
    var j = getRandomInteger(0, givenFeaturesCopy.length - 1);
    features[i] = givenFeaturesCopy.splice(j, 1).toString();
  }

  return features;
}

function getTicket() {
  var type = {
    'Большая уютная квартира': 'flat',
    'Маленькая неуютная квартира': 'flat',
    'Огромный прекрасный дворец': 'house',
    'Маленький ужасный дворец': 'house',
    'Красивый гостевой домик': 'house',
    'Некрасивый негостеприимный домик': 'house',
    'Уютное бунгало далеко от моря': 'bungalo',
    'Неуютное бунгало по колено в воде': 'bungalo'
  };
  var offerTitle = getRandomTitle();
  var offerType = type[offerTitle];
  var MIN_LOCATION_X = 300;
  var MAX_LOCATION_X = 900;
  var MIN_LOCATION_Y = 100;
  var MAX_LOCATION_Y = 500;
  var locationX = getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var offerRooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_GUESTS_PER_ROOM = 1;
  var MAX_GUESTS_PER_ROOM = 3;
  var ticket = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomAvatar() + '.png'
    },
    'offer': {
      'title': offerTitle,
      'address': locationX + ', ' + locationY,
      'price': getRandomInteger(MIN_PRICE, MAX_PRICE),
      'type': offerType,
      'rooms': offerRooms,
      'guests': offerRooms * getRandomInteger(MIN_GUESTS_PER_ROOM, MAX_GUESTS_PER_ROOM),
      'checkin': getRandomTime(),
      'checkout': getRandomTime(),
      'features': getFeatures(),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return ticket;
}

function getSimilarTickets() {
  var TICKETS_QUANTITY = 8;
  for (var i = 0; i < TICKETS_QUANTITY; i++) {
    similarTickets[i] = getTicket();
  }

  return similarTickets;
}

function displayMapPins() {
  var Fragment = document.createDocumentFragment();
  var IMPOSITION_ERROR = 4;
  var HALFWAY_MAP_PIN_IMG_HEIGHT = 23;
  var PSEUDO_BULDGE = 16;


  for (var i = 0; i < similarTickets.length; i++) {
    var newPin = document.createElement('button');
    newPin.style = 'left: ' + (similarTickets[i].location.x - IMPOSITION_ERROR) + 'px; top: ' + (similarTickets[i].location.y - (HALFWAY_MAP_PIN_IMG_HEIGHT + PSEUDO_BULDGE)) + 'px;';
    newPin.className = 'map__pin';
    newPin.innerHTML = '<img src="' + similarTickets[i].author.avatar + '" width="40" height="40" draggable="false"></button>';

    Fragment.appendChild(newPin);
  }

  mapPinsContainer.appendChild(Fragment);
}

function removeMapFading() {
  map.classList.remove('map--faded');
}

function appendTickets() {
  var Fragment = document.createDocumentFragment();
  var type = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  for (var j = 0; j < similarTickets.length; j++) {
    var ticket = ticketTemplate.cloneNode(true);
    var featuresList = ticket.querySelectorAll('.feature');
    var featuresListConteiner = ticket.querySelector('.popup__features');
    ticket.querySelector('h3').textContent = similarTickets[j].offer.title;
    ticket.querySelector('small').textContent = similarTickets[j].offer.address;
    ticket.querySelector('.popup__price').textContent = similarTickets[j].offer.price + ' \u20BD/ночь';
    ticket.querySelector('h4').textContent = type[similarTickets[j].offer.type];
    ticket.children[6].textContent = similarTickets[j].offer.rooms + ' комн. для ' + similarTickets[j].offer.guests + ' гостей';
    ticket.children[7].textContent = 'Заезд после ' + similarTickets[j].offer.checkin + ', выезд до ' + similarTickets[j].offer.checkout;
    for (var i = 0; i < GIVEN_FEATURES.length; i++) {
      if (similarTickets[j].offer.features.indexOf(GIVEN_FEATURES[i]) === -1) {
        featuresListConteiner.removeChild(featuresList[i]);
      }
    }
    ticket.children[9].textContent = similarTickets[j].offer.description;
    ticket.querySelector('.popup__avatar').src = similarTickets[j].author.avatar;
    featuresListConteiner.parentNode.classList.add('hidden');
    Fragment.appendChild(ticket);
  }
  map.appendChild(Fragment);
  ticketPopupCloseButtons = map.querySelectorAll('.popup__close');

  return ticket;
}

function enableUserForm() {
  for (var i = 0; i < userFormDisabledParts.length; i++) {
    userFormDisabledParts[i].removeAttribute('disabled');
    userFormDisabledParts[i].classList.remove('notice__form--disabled');
  }
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeTicket();
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

function closeTicket() {
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].classList.remove('map__pin--active');
  }
  for (var j = 0; j < ticketPopups.length; j++) {
    ticketPopups[j].classList.add('hidden');
  }
  document.removeEventListener('keydown', onPopupEscPress);
}

function onUserPinMouseup() {
  removeMapFading();
  displayMapPins();
  enableUserForm();
  ticketPopups = map.querySelectorAll('.popup');
  mapPins = map.querySelectorAll('.map__pin');
  userPin.removeEventListener('mouseup', onUserPinMouseup);
  mapPinsContainer.addEventListener('click', toggleTicket);
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  housingTypeSelect.addEventListener('change', onHousingTypeSelectChange);
  roomsQuantitySelect.addEventListener('change', onRoomsQuantitySelectChange);
  for (var i = 0; i < ticketPopups.length; i++) {
    ticketPopupCloseButtons[i].addEventListener('click', closeTicket);
  }
}

function onTimeInSelectChange() {
  for (var i = 0; i < timeOutSelect.length; i++) {
    var timeInOption = timeInSelect.options[i];
    var timeOutOption = timeOutSelect.options[i];
    if (timeInOption.selected) {
      timeOutOption.selected = true;
    }
  }
}

function onTimeOutSelectChange() {
  for (var i = 0; i < timeOutSelect.length; i++) {
    var timeInOption = timeInSelect.options[i];
    var timeOutOption = timeOutSelect.options[i];
    if (timeOutOption.selected) {
      timeInOption.selected = true;
    }
  }
}

function onHousingTypeSelectChange() {
  var type = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  for (var i = 0; i < housingTypeSelect.length; i++) {
    var typeOption = housingTypeSelect.options[i];
    if (typeOption.selected) {
      housingPriceInput.setAttribute('min', type[typeOption.value]);
    }
  }
}

function onRoomsQuantitySelectChange() {
  for (var i = 0; i < roomsQuantitySelect.length; i++) {
    var quantity = roomsQuantitySelect.options[i];
    if (quantity.selected) {
      quantity = quantity.value;
    }
    switch (quantity) {
      case '1':
        roomsCapacitySelect.options[0].disabled = true;
        roomsCapacitySelect.options[1].disabled = true;
        roomsCapacitySelect.options[2].disabled = false;
        roomsCapacitySelect.options[3].disabled = true;
        roomsCapacitySelect.options[2].selected = true;
        break;
      case '2':
        roomsCapacitySelect.options[0].disabled = true;
        roomsCapacitySelect.options[1].disabled = false;
        roomsCapacitySelect.options[2].disabled = false;
        roomsCapacitySelect.options[3].disabled = true;
        roomsCapacitySelect.options[2].selected = true;
        break;
      case '3':
        roomsCapacitySelect.options[0].disabled = false;
        roomsCapacitySelect.options[1].disabled = false;
        roomsCapacitySelect.options[2].disabled = false;
        roomsCapacitySelect.options[3].disabled = true;
        roomsCapacitySelect.options[2].selected = true;
        break;
      case '100':
        roomsCapacitySelect.options[0].disabled = true;
        roomsCapacitySelect.options[1].disabled = true;
        roomsCapacitySelect.options[2].disabled = true;
        roomsCapacitySelect.options[3].disabled = false;
        roomsCapacitySelect.options[3].selected = true;
        break;
    }
  }
}
