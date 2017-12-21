'use strict';


window.cards = (function () {
  function createCards(advertismentTickets, map) {
    var GIVEN_FEATURES = [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ];
    var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
    var fragment = document.createDocumentFragment();
    var type = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    advertismentTickets.forEach(function (card) {
      var ticket = cardTemplate.cloneNode(true);
      var featuresList = ticket.querySelectorAll('.feature');
      var featuresListConteiner = ticket.querySelector('.popup__features');
      var photosList = ticket.querySelector('.popup__pictures');
      var photoContainer = photosList.querySelector('li');
      var photo = photoContainer.querySelector('img');

      photoContainer.style.display = 'flex';

      photo.className = 'popup__picture';
      photo.height = '105';
      photo.style.cursor = 'pointer';
      photo.style.margin = '0 auto';

      ticket.querySelector('h3').textContent = card.offer.title;
      ticket.querySelector('small').textContent = card.offer.address;
      ticket.querySelector('.popup__price').textContent = card.offer.price + ' \u20BD/ночь';
      ticket.querySelector('h4').textContent = type[card.offer.type];
      ticket.children[6].textContent = card.offer.rooms + ' комн. для ' + card.offer.guests + ' гостей';
      ticket.children[7].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

      GIVEN_FEATURES.forEach(function (feature, index) {
        if (card.offer.features.indexOf(feature) === -1) {
          featuresListConteiner.removeChild(featuresList[index]);
        }
      });

      ticket.children[9].textContent = card.offer.description;
      ticket.querySelector('.popup__avatar').src = card.author.avatar;
      featuresListConteiner.parentNode.classList.add('hidden');

      if (card.offer.photos.length > 0) {
        for (var i = 1; i < card.offer.photos.length; i++) {
          photosList.appendChild(photoContainer.cloneNode(true));
        }
      }

      var images = photosList.querySelectorAll('.popup__picture');
      card.offer.photos.forEach(function (image, index) {
        images[index].src = image;
      });

      for (var j = 1; j < images.length; j++) {
        images[j].classList.add('hidden');
      }

      if (card.offer.photos.length === 0) {
        photosList.removeChild(photoContainer);
      }

      fragment.appendChild(ticket);
    });

    map.appendChild(fragment);
  }

  return createCards;
})();
