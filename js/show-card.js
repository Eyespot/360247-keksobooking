'use strict';


window.showCard = (function () {
  var clickedButtonIndex;

  function showTicket(evt, buttons, cards, keydownListener) {
    var target = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;

    if (target.className !== 'map__pin') {
      return;
    }

    for (var i = 1; i < buttons.length; i++) {
      if (target === buttons[i]) {
        clickedButtonIndex = i;
        buttons[clickedButtonIndex].classList.add('map__pin--active');
        cards[clickedButtonIndex - 1].classList.remove('hidden');
      }
    }

    document.addEventListener('keydown', keydownListener);
  }

  function closeTicket(buttons, cards, keydownListener) {

    if (clickedButtonIndex) {
      cards[clickedButtonIndex - 1].classList.add('hidden');
      buttons[clickedButtonIndex].classList.remove('map__pin--active');
      document.removeEventListener('keydown', keydownListener);
      clickedButtonIndex = null;
    }
  }

  return {
    showTicket: showTicket,
    closeTicket: closeTicket
  };
})();
