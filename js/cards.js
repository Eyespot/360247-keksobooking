'use strict';


window.cards = (function () {
  var CARD_TEMPLATE = document.querySelector('template').content.querySelector('article.map__card');

  var GIVEN_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var TYPE = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  function getTicketFeatures(stencil, card, featuresList, featuresListConteiner) {

    GIVEN_FEATURES.forEach(function (feature, index) {

      if (card.offer.features.indexOf(feature) === -1) {
        featuresListConteiner.removeChild(featuresList[index]);
      }
    });
  }

  function addPhotos(stencil, card) {
    var photosList = stencil.querySelector('.popup__pictures');
    var photoContainer = photosList.querySelector('li');
    var photo = photoContainer.querySelector('img');
    var images;

    photoContainer.style.display = 'flex';

    photo.className = 'popup__picture';
    photo.height = '105';
    photo.style.cursor = 'pointer';
    photo.style.margin = '0 auto';

    if (card.offer.photos.length > 0) {
      for (var i = 1; i < card.offer.photos.length; i++) {
        photosList.appendChild(photoContainer.cloneNode(true));
      }
    }

    images = photosList.querySelectorAll('.popup__picture');
    card.offer.photos.forEach(function (image, index) {
      images[index].src = image;
    });

    for (var j = 1; j < images.length; j++) {
      images[j].classList.add('hidden');
    }

    if (card.offer.photos.length === 0) {
      photosList.removeChild(photoContainer);
    }
  }

  function create(advertismentTickets, map) {
    var fragment = document.createDocumentFragment();

    advertismentTickets.forEach(function (card) {
      var stencil = CARD_TEMPLATE.cloneNode(true);
      var featuresList = stencil.querySelectorAll('.feature');
      var featuresListConteiner = stencil.querySelector('.popup__features');
      var title = stencil.querySelector('h3');
      var address = stencil.querySelector('small');
      var price = stencil.querySelector('.popup__price');
      var housingType = stencil.querySelector('h4');
      var capacity = stencil.children[6];
      var capacityContent = card.offer.rooms + ' комн. для ' + card.offer.guests + ' гостей';
      var time = stencil.children[7];
      var timeContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
      var description = stencil.children[9];
      var avatar = stencil.querySelector('.popup__avatar');

      title.textContent = card.offer.title;
      address.textContent = card.offer.address;
      price.textContent = card.offer.price + ' \u20BD/ночь';
      housingType.textContent = TYPE[card.offer.type];
      capacity.textContent = capacityContent;
      time.textContent = timeContent;
      description.textContent = card.offer.description;
      avatar.src = card.author.avatar;
      stencil.classList.add('hidden');

      getTicketFeatures(stencil, card, featuresList, featuresListConteiner);

      addPhotos(stencil, card);

      fragment.appendChild(stencil);
    });

    map.appendChild(fragment);
  }

  return create;
})();
