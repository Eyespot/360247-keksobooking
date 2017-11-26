'use strict';


var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var times = ['12:00', '13:00', '14:00'];
var givenFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var similarTickets = [];

function getRandomInteger(min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
}

var getSimilarTickets = function () {

  var getTicket = function () {

    var getRandomAvatar = function () {
      var i = getRandomInteger(0, avatars.length - 1);
      var avatar = avatars[i];
      avatars.splice(i, 1);
      return avatar;
    };

    var getRandomTitle = function () {
      var i = getRandomInteger(0, titles.length - 1);
      var title = titles[i];
      titles.splice(i, 1);
      return title;
    };

    var getRandomTime = function () {
      var i = getRandomInteger(0, times.length - 1);
      var time = times[i];
      return time;
    };

    var getFeatures = function () {
      var size = getRandomInteger(1, 6);
      var features = [];
      var j = getRandomInteger(0, size - 1);
      var allFeatures = givenFeatures.slice(0, 6);
      for (var i = 0; i < size; i++) {
        features[i] = allFeatures[j];
        allFeatures.splice(j, 1);
        j = getRandomInteger(0, allFeatures.length - 1);
      }
      return features;
    };

    var getHousingType = function () {
      var type;
      if (offerTitle === 'Большая уютная квартира' || offerTitle === 'Маленькая неуютная квартира') {
        type = 'flat';
        return type;
      } else if (offerTitle === 'Огромный прекрасный дворец' || offerTitle === 'Маленький ужасный дворец' || offerTitle === 'Красивый гостевой домик' || offerTitle === 'Некрасивый негостеприимный домик') {
        type = 'house';
        return type;
      }
      type = 'bungalo';
      return type;
    };

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
  };

  for (var i = 0; i < 8; i++) {
    similarTickets[i] = getTicket();
  }
  return similarTickets;
};

var mapPinsContainer = document.querySelector('.map__pins');
var mapPinsFragment = document.createDocumentFragment();

var insertingMapPins = function () {
  for (var i = 0; i < 7; i++) {
    var newPin = document.createElement('button');
    newPin.style = 'left: ' + (similarTickets[i].location.x - 23) + 'px; top: ' + (similarTickets[i].location.y - 64) + 'px;';
    newPin.className = 'map__pin';
    newPin.innerHTML = '<img src="' + similarTickets[i].author.avatar + '" width="40" height="40" draggable="false"></button>';

    mapPinsFragment.appendChild(newPin);
  }

  mapPinsContainer.appendChild(mapPinsFragment);
};

var map = document.querySelector('.map');

var removeMapFading = function () {
  map.classList.remove('map--faded');
};

var ticketTemplate = document.querySelector('template').content.querySelector('article.map__card');

var insertFirstTicket = function () {
  var ticket = ticketTemplate.cloneNode(true);
  ticket.querySelector('h3').textContent = similarTickets[0].offer.title;
  ticket.querySelector('small').textContent = similarTickets[0].offer.address;
  ticket.querySelector('.popup__price').textContent = similarTickets[0].offer.price + ' \u20BD/ночь';
  if (similarTickets[0].offer.type === 'flat') {
    similarTickets[0].offer.type = 'Квартира';
  } else if (similarTickets[0].offer.type === 'house') {
    similarTickets[0].offer.type = 'Дом';
  } else {
    similarTickets[0].offer.type = 'Бунгало';
  }
  ticket.querySelector('h4').textContent = similarTickets[0].offer.type;
  ticket.children[6].textContent = similarTickets[0].offer.rooms + ' комн. для ' + similarTickets[0].offer.guests + ' гостей';
  ticket.children[7].textContent = 'Заезд после ' + similarTickets[0].offer.checkin + ', выезд до ' + similarTickets[0].offer.checkout;
  var featuresList = ticket.querySelectorAll('.feature');
  var featuresListConteiner = ticket.querySelector('.popup__features');
  for (var i = featuresList.length - 1; i >= 0; i--) {
    var child = featuresList[i];
    featuresListConteiner.removeChild(child);
  }
  // var featuresListFragment = document.createDocumentFragment();
  for (var j = 0; j <= similarTickets[0].offer.features.length - 1; j++) {
    var newFeature = document.createElement('li');
    newFeature.classList = 'feature feature--' + similarTickets[0].offer.features[j];
    featuresListConteiner.appendChild(newFeature);
  }
  ticket.children[9].textContent = similarTickets[0].offer.description;
  ticket.querySelector('.popup__avatar').src = similarTickets[0].author.avatar;
  map.appendChild(ticket);
};

getSimilarTickets();
removeMapFading();
insertingMapPins();
insertFirstTicket();
// console.log(ticketTemplate);
// console.log(similarTickets);
