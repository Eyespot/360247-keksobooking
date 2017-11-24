'use strict';


var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var times = ['12:00', '13:00', '14:00'];

function getRandomInteger(min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
}

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

var getHousingType = function () {
  var type;
  if (similarTickets[0].offer.title === 'Большая уютная квартира' || similarTickets[0].offer.title === 'Маленькая неуютная квартира') {
    type = 'flat';
    return type;
  } else if (similarTickets[0].offer.title === 'Огромный прекрасный дворец' || similarTickets[0].offer.title === 'Маленький ужасный дворец' || similarTickets[0].offer.title === 'Красивый гостевой домик' || similarTickets[0].offer.title === 'Некрасивый негостеприимный домик') {
    type = 'house';
    return type;
  }
  type = 'bungalo';
  return type;
};

var getFeatures = function () {
  var allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var size = getRandomInteger(1, 6);
  var features = [];
  var j = getRandomInteger(0, 5);
  for (var i = 0; i < size; i++) {
    features[i] = allFeatures[j];
    allFeatures.splice(j, 1);
  }
  return features;
};

var similarTickets = [
  {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomAvatar() + '.png'
    },
    'offer': {
      'title': '',
      'address': '',
      'price': getRandomInteger(1000, 1000000),
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': getRandomTime(),
      'checkout': getRandomTime(),
      'features': getFeatures(),
      'description': '',
      'photos': []
    },
    'location': {
      'x': getRandomInteger(90, 300),
      'y': getRandomInteger(50, 100)
    }
  }
];
similarTickets[0].offer.title += getRandomTitle();
similarTickets[0].offer.type = getHousingType();
similarTickets[0].offer.address = '' + similarTickets[0].location.x + ', ' + similarTickets[0].location.y;
similarTickets[0].offer.rooms = getRandomInteger(1, 5);
similarTickets[0].offer.guests = similarTickets[0].offer.rooms * getRandomInteger(1, 3);

console.log(similarTickets);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
