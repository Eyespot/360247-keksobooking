'use strict';


window.showCard = (function () {

  function showTicket(evt, buttons, cards, keydownListener) {
    var target = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    var clickedButtonIndex;

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

    window.showCard.showTicket.clickedPin = target;
    window.showCard.showTicket.openedTicket = cards[clickedButtonIndex - 1];

    document.addEventListener('keydown', keydownListener);
  }

  return {
    showTicket: showTicket
  };
})();
