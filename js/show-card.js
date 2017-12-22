'use strict';


window.showCard = (function () {
  var INDEX_SYNCHRONIZATION_VALUE = window.util.indexSynchronizationValue;
  var ACTIVATED_PIN_CLASS = 'map__pin--active';
  var PIN_CLASS = 'map__pin';

  var clickedIndex;
  var synchronizedIndex;
  var counter = 0;

  function showTicket(evt, buttons, cards, photosLists, togglePicture, keydownListener) {
    var target = (evt.target.classList.contains(PIN_CLASS)) ? evt.target : evt.target.parentNode;

    if (target.className !== PIN_CLASS) {

      return;
    }

    for (var i = 1; i < buttons.length; i++) {

      if (target === buttons[i]) {
        clickedIndex = i;
        synchronizedIndex = clickedIndex - INDEX_SYNCHRONIZATION_VALUE;

        buttons[clickedIndex].classList.add(ACTIVATED_PIN_CLASS);
        cards[synchronizedIndex].classList.remove('hidden');

        if (photosLists[synchronizedIndex].children.length > 0) {
          photosLists[synchronizedIndex].addEventListener('click', togglePicture);
        }
      }
    }

    document.addEventListener('keydown', keydownListener);
  }

  function closeTicket(buttons, cards, photosLists, togglePicture, pictures, keydownListener) {

    if (clickedIndex) {
      cards[synchronizedIndex].classList.add('hidden');
      buttons[clickedIndex].classList.remove(ACTIVATED_PIN_CLASS);
      document.removeEventListener('keydown', keydownListener);

      if (photosLists[synchronizedIndex].children.length > 0) {
        photosLists[synchronizedIndex].removeEventListener('click', togglePicture);

        resetPictures(pictures);
      }

      clickedIndex = null;
    }
  }

  function hidePicture(pictures) {
    pictures[synchronizedIndex][counter].classList.add('hidden');
  }

  function showPicture(pictures) {
    pictures[synchronizedIndex][counter].classList.remove('hidden');
  }

  function resetPictures(pictures) {
    hidePicture(pictures);
    counter = 0;
    showPicture(pictures);
  }

  function showNextPicture(pictures) {
    hidePicture(pictures);
    counter++;
    showPicture(pictures);
  }

  function togglePictures(pictures) {

    if (pictures[synchronizedIndex].length > 1) {

      if (counter === pictures[synchronizedIndex].length - 1) {
        resetPictures(pictures);

        return;
      }

      showNextPicture(pictures);
    }
  }

  return {
    showTicket: showTicket,
    closeTicket: closeTicket,
    togglePictures: togglePictures
  };
})();
