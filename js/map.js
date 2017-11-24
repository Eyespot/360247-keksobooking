'use strict';


var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

function getRandomInteger(min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
}

var getRandomAvatar = function () {
  var i = getRandomInteger(0, avatars.length - 1);
  var avatar;
  avatar = avatars[i];
  avatars.splice(i, 1);
  return avatar;
};

var getRandomTitle = function () {
  var i = getRandomInteger(0, titles.length - 1);
  var title;
  title = titles[i];
  titles.splice(i, 1);
  return title;
};

var getHousingType = function () {
  var type;
  if (similarTickets[0].offer.title === 'Большая уютная квартира' || 'Маленькая неуютная квартира') {
    type = 'flat';
    return type;
  } else if (similarTickets[0].offer.title === 'Огромный прекрасный дворец' || 'Маленький ужасный дворец' || 'Красивый гостевой домик' || 'Некрасивый негостеприимный домик') {
    type = 'house';
    return type;
  }
  type = 'bungalo';
  return type;
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
      'rooms': getRandomInteger(1, 5),
      'guests': 8,
      'checkin': '12:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
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
console.log('' + similarTickets[0].offer.title + ',' + similarTickets[0].location.y);
console.log('' + similarTickets[0].location.x + ',' + similarTickets[0].location.y);
console.log(getHousingType());

// similarTickets[1] = {
//   'offer': {
//     'title': '' + getRandomTitle(),
//     'address': 'similarTickets[2].location.x',
//     'price': 95000,
//     'type': 'bungalo',
//     'rooms': 4,
//     'guests': 8,
//     'checkin': '12:00',
//     'checkout': '14:00',
//     'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//     'description': '',
//     'photos': []
//   }
// };
//
// similarTickets[2] = {
//   'location': {
//     'x': getRandomInteger(90, 300),
//     'y': getRandomInteger(50, 100)
//   }
// };

console.log(similarTickets);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
