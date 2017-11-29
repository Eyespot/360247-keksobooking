'use strict';


var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TIMES = ['12:00', '13:00', '14:00'];
var GIVEN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var ticketTemplate = document.querySelector('template').content.querySelector('article.map__card');
var mapPinsContainer = document.querySelector('.map__pins');
var similarTickets = [];

function getRandomInteger(min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
}

function getRandomAvatar() {
  var i = getRandomInteger(0, avatars.length - 1);
  var avatar = avatars[i];
  avatars.splice(i, 1);

  return avatar;
}

function getRandomTitle() {
  var i = getRandomInteger(0, titles.length - 1);
  var title = titles[i];
  titles.splice(i, 1);

  return title;
}

function getRandomTime() {
  var i = getRandomInteger(0, TIMES.length - 1);
  var time = TIMES[i];

  return time;
}

function getFeatures() {
  var size = getRandomInteger(1, GIVEN_FEATURES.length);
  var features = [];
  var j = getRandomInteger(0, size - 1);
  var allFeatures = GIVEN_FEATURES.slice(0, 6);
  for (var i = 0; i < size; i++) {
    features[i] = allFeatures[j];
    allFeatures.splice(j, 1);
    j = getRandomInteger(0, allFeatures.length - 1);
  }

  return features;
}

function getTicket() {

  function getHousingType() {
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

    return type[offerTitle];
  }

  var offerTitle = getRandomTitle();
  var offerType = getHousingType();
  var locationX = getRandomInteger(300, 900);
  var locationY = getRandomInteger(100, 500);
  var offerRooms = getRandomInteger(1, 5);

  var ticket = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomAvatar() + '.png'
    },
    'offer': {
      'title': offerTitle,
      'address': locationX + ', ' + locationY,
      'price': getRandomInteger(1000, 1000000),
      'type': offerType,
      'rooms': offerRooms,
      'guests': offerRooms * getRandomInteger(1, 3),
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
  for (var i = 0; i < 8; i++) {
    similarTickets[i] = getTicket();
  }

  return similarTickets;
}

function insertingMapPins() {
  var Fragment = document.createDocumentFragment();

  for (var i = 0; i < 7; i++) {
    var newPin = document.createElement('button');
    newPin.style = 'left: ' + (similarTickets[i].location.x - 23) + 'px; top: ' + (similarTickets[i].location.y - 64) + 'px;';
    newPin.className = 'map__pin';
    newPin.innerHTML = '<img src="' + similarTickets[i].author.avatar + '" width="40" height="40" draggable="false"></button>';

    Fragment.appendChild(newPin);
  }

  mapPinsContainer.appendChild(Fragment);
}

function removeMapFading() {
  map.classList.remove('map--faded');
}

function insertFirstTicket() {
  var ticket = ticketTemplate.cloneNode(true);
  ticket.querySelector('h3').textContent = similarTickets[0].offer.title;
  ticket.querySelector('small').textContent = similarTickets[0].offer.address;
  ticket.querySelector('.popup__price').textContent = similarTickets[0].offer.price + ' \u20BD/ночь';
  function convertHousingTypeInRussian() {
    var type = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    return type[similarTickets[0].offer.type];
  }
  ticket.querySelector('h4').textContent = convertHousingTypeInRussian();
  ticket.children[6].textContent = similarTickets[0].offer.rooms + ' комн. для ' + similarTickets[0].offer.guests + ' гостей';
  ticket.children[7].textContent = 'Заезд после ' + similarTickets[0].offer.checkin + ', выезд до ' + similarTickets[0].offer.checkout;
  var featuresList = ticket.querySelectorAll('.feature');
  var featuresListConteiner = ticket.querySelector('.popup__features');
  for (var i = 0; i < GIVEN_FEATURES.length; i++) {
    if (similarTickets[0].offer.features.indexOf(GIVEN_FEATURES[i]) === -1) {
      featuresListConteiner.removeChild(featuresList[i]);
    }
  }
  ticket.children[9].textContent = similarTickets[0].offer.description;
  ticket.querySelector('.popup__avatar').src = similarTickets[0].author.avatar;

  map.appendChild(ticket);
}

getSimilarTickets();
removeMapFading();
insertingMapPins();
insertFirstTicket();
