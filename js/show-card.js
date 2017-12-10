'use strict';


(function () {
  window.showCard = function (evt, buttons, cards, keydownListener) {
    var target = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    var clickedButtonIndex;

    if (target.className !== 'map__pin') {
      document.removeEventListener('keydown', keydownListener);
      return;
    }

    for (var i = 1; i < buttons.length; i++) {
      if (target === buttons[i]) {
        clickedButtonIndex = i;
        cards[clickedButtonIndex - 1].classList.remove('hidden');
        buttons[clickedButtonIndex].classList.add('map__pin--active');
      }
    }

    document.addEventListener('keydown', keydownListener);
  };
})();
