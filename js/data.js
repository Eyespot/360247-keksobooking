'use strict';


window.dataStack = (function () {
  var getRandomInteger = window.util.getRandomInteger;
  var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var GIVEN_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var advertismentTickets = [];

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
    var HALFWAY_PSEUDO_WIDTH = 5;
    var PSEUDO_HEIGHT = 18;
    var HALFWAY_MAP_PIN_HEIGHT = 22;
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
        'x': locationX - (HALFWAY_PSEUDO_WIDTH),
        'y': locationY - (HALFWAY_MAP_PIN_HEIGHT + PSEUDO_HEIGHT)
      }
    };

    return ticket;
  }

  function getAdvertismentTickets() {
    var TICKETS_QUANTITY = 8;
    for (var i = 0; i < TICKETS_QUANTITY; i++) {
      advertismentTickets[i] = getTicket();
    }
    return advertismentTickets;
  }

  return {
    advertismentTickets: getAdvertismentTickets(),
    GIVEN_FEATURES: GIVEN_FEATURES
  };
})();
