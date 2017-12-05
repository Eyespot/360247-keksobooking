'use strict';


(function () {
  var map = window.pins.map;
  var advertismentTickets = window.dataStack.advertismentTickets;
  var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

  (function appendCards() {
    var Fragment = document.createDocumentFragment();
    var type = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    for (var i = 0; i < advertismentTickets.length; i++) {
      var ticket = cardTemplate.cloneNode(true);
      var featuresList = ticket.querySelectorAll('.feature');
      var featuresListConteiner = ticket.querySelector('.popup__features');
      ticket.querySelector('h3').textContent = advertismentTickets[i].offer.title;
      ticket.querySelector('small').textContent = advertismentTickets[i].offer.address;
      ticket.querySelector('.popup__price').textContent = advertismentTickets[i].offer.price + ' \u20BD/ночь';
      ticket.querySelector('h4').textContent = type[advertismentTickets[i].offer.type];
      ticket.children[6].textContent = advertismentTickets[i].offer.rooms + ' комн. для ' + advertismentTickets[i].offer.guests + ' гостей';
      ticket.children[7].textContent = 'Заезд после ' + advertismentTickets[i].offer.checkin + ', выезд до ' + advertismentTickets[i].offer.checkout;
      for (var j = 0; j < window.dataStack.GIVEN_FEATURES.length; j++) {
        if (advertismentTickets[i].offer.features.indexOf(window.dataStack.GIVEN_FEATURES[j]) === -1) {
          featuresListConteiner.removeChild(featuresList[j]);
        }
      }
      ticket.children[9].textContent = advertismentTickets[i].offer.description;
      ticket.querySelector('.popup__avatar').src = advertismentTickets[i].author.avatar;
      featuresListConteiner.parentNode.classList.add('hidden');
      Fragment.appendChild(ticket);
    }

    map.appendChild(Fragment);
  })();
})();
