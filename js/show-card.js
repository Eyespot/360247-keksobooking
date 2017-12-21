'use strict';


window.showCard = (function () {
  var clickedButtonIndex;
  var currentPicture = 0;
  var CARDS_INDEX_SYNCHRONIZATION = 1;

  function showTicket(evt, buttons, cards, photosLists, togglePicture, keydownListener) {
    var target = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;

    if (target.className !== 'map__pin') {

      return;
    }

    for (var i = 1; i < buttons.length; i++) {

      if (target === buttons[i]) {
        clickedButtonIndex = i;
        buttons[clickedButtonIndex].classList.add('map__pin--active');
        cards[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].classList.remove('hidden');

        if (photosLists[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].children.length !== 0) {
          photosLists[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].addEventListener('click', togglePicture);
        }
      }
    }

    document.addEventListener('keydown', keydownListener);
  }

  function closeTicket(buttons, cards, photosLists, togglePicture, pictures, keydownListener) {

    if (clickedButtonIndex) {
      cards[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].classList.add('hidden');
      buttons[clickedButtonIndex].classList.remove('map__pin--active');
      document.removeEventListener('keydown', keydownListener);

      if (photosLists[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].children.length !== 0) {
        photosLists[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].removeEventListener('click', togglePicture);

        resetPictures(pictures);
      }

      clickedButtonIndex = null;
    }
  }

  function resetPictures(pictures) {
    pictures[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION][currentPicture].classList.add('hidden');
    currentPicture = 0;
    pictures[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION][currentPicture].classList.remove('hidden');
  }

  function togglePictures(pictures) {

    if (pictures[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].length > 1) {

      if (currentPicture === pictures[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION].length - 1) {
        resetPictures(pictures);

        return;
      }

      pictures[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION][currentPicture].classList.add('hidden');
      pictures[clickedButtonIndex - CARDS_INDEX_SYNCHRONIZATION][currentPicture + 1].classList.remove('hidden');
      currentPicture++;
    }
  }

  return {
    showTicket: showTicket,
    closeTicket: closeTicket,
    togglePictures: togglePictures
  };
})();
