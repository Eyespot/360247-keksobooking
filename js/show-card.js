'use strict';


window.showCard = (function () {
  var clickedButtonIndex;
  var currentPicture = 0;
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
        clickedButtonIndex = i;
        buttons[clickedButtonIndex].classList.add(ACTIVATED_PIN_CLASS);
        cards[clickedButtonIndex - INDEX_SYNCHRONIZATION].classList.remove('hidden');

        if (photosLists[clickedButtonIndex - INDEX_SYNCHRONIZATION].children.length !== 0) {
          photosLists[clickedButtonIndex - INDEX_SYNCHRONIZATION].addEventListener('click', togglePicture);
        }
      }
    }

    document.addEventListener('keydown', keydownListener);
  }

  function closeTicket(buttons, cards, photosLists, togglePicture, pictures, keydownListener) {

    if (clickedButtonIndex) {
      cards[clickedButtonIndex - INDEX_SYNCHRONIZATION].classList.add('hidden');
      buttons[clickedButtonIndex].classList.remove(ACTIVATED_PIN_CLASS);
      document.removeEventListener('keydown', keydownListener);

      if (photosLists[clickedButtonIndex - INDEX_SYNCHRONIZATION].children.length !== 0) {
        photosLists[clickedButtonIndex - INDEX_SYNCHRONIZATION].removeEventListener('click', togglePicture);

        resetPictures(pictures);
      }

      clickedButtonIndex = null;
    }
  }

  function resetPictures(pictures) {
    pictures[clickedButtonIndex - INDEX_SYNCHRONIZATION][currentPicture].classList.add('hidden');
    currentPicture = 0;
    pictures[clickedButtonIndex - INDEX_SYNCHRONIZATION][currentPicture].classList.remove('hidden');
  }

  function togglePictures(pictures) {

    if (pictures[clickedButtonIndex - INDEX_SYNCHRONIZATION].length > 1) {

      if (currentPicture === pictures[clickedButtonIndex - INDEX_SYNCHRONIZATION].length - 1) {
        resetPictures(pictures);

        return;
      }

      pictures[clickedButtonIndex - INDEX_SYNCHRONIZATION][currentPicture].classList.add('hidden');
      pictures[clickedButtonIndex - INDEX_SYNCHRONIZATION][currentPicture + 1].classList.remove('hidden');
      currentPicture++;
    }
  }

  return {
    showTicket: showTicket,
    closeTicket: closeTicket,
    togglePictures: togglePictures
  };
})();
