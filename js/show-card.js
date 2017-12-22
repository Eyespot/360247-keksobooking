'use strict';


window.showCard = (function () {
  var clickedIndex;
  var counter = 0;
  var INDEX_SYNCHRONIZATION = 1;
  var ACTIVATED_PIN_CLASS = 'map__pin--active';
  var PIN_CLASS = 'map__pin';

  function showTicket(evt, buttons, cards, photosLists, togglePicture, keydownListener) {
    var target = (evt.target.classList.contains(PIN_CLASS)) ? evt.target : evt.target.parentNode;

    if (target.className !== PIN_CLASS) {

      return;
    }

    for (var i = 1; i < buttons.length; i++) {

      if (target === buttons[i]) {
        clickedIndex = i;
        buttons[clickedIndex].classList.add(ACTIVATED_PIN_CLASS);
        cards[clickedIndex - INDEX_SYNCHRONIZATION].classList.remove('hidden');

        if (photosLists[clickedIndex - INDEX_SYNCHRONIZATION].children.length !== 0) {
          photosLists[clickedIndex - INDEX_SYNCHRONIZATION].addEventListener('click', togglePicture);
        }
      }
    }

    document.addEventListener('keydown', keydownListener);
  }

  function closeTicket(buttons, cards, photosLists, togglePicture, pictures, keydownListener) {

    if (clickedIndex) {
      cards[clickedIndex - INDEX_SYNCHRONIZATION].classList.add('hidden');
      buttons[clickedIndex].classList.remove(ACTIVATED_PIN_CLASS);
      document.removeEventListener('keydown', keydownListener);

      if (photosLists[clickedIndex - INDEX_SYNCHRONIZATION].children.length !== 0) {
        photosLists[clickedIndex - INDEX_SYNCHRONIZATION].removeEventListener('click', togglePicture);

        resetPictures(pictures);
      }

      clickedIndex = null;
    }
  }

  function resetPictures(pictures) {
    pictures[clickedIndex - INDEX_SYNCHRONIZATION][counter].classList.add('hidden');

    counter = 0;

    pictures[clickedIndex - INDEX_SYNCHRONIZATION][counter].classList.remove('hidden');
  }

  function togglePictures(pictures) {

    if (pictures[clickedIndex - INDEX_SYNCHRONIZATION].length > 1) {

      if (counter === pictures[clickedIndex - INDEX_SYNCHRONIZATION].length - 1) {
        resetPictures(pictures);

        return;
      }

      pictures[clickedIndex - INDEX_SYNCHRONIZATION][counter].classList.add('hidden');

      counter++;

      pictures[clickedIndex - INDEX_SYNCHRONIZATION][counter].classList.remove('hidden');
    }
  }

  return {
    showTicket: showTicket,
    closeTicket: closeTicket,
    togglePictures: togglePictures
  };
})();
