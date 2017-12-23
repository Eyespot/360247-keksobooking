'use strict';


window.affectCard = (function () {
  var INDEX_SYNCHRONIZATION_VALUE = window.util.INDEX_SYNCHRONIZATION_VALUE;
  var ACTIVATED_PIN_CLASS = 'map__pin--active';
  var PIN_CLASS = 'map__pin';

  var clickedIndex;
  var synchronizedIndex;
  var counter = 0;

  function show(evt, buttons, cards, photosLists, onCardPictureClick, onKeyDown) {
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

        if (photosLists[synchronizedIndex].children.length > 1) {
          photosLists[synchronizedIndex].addEventListener('click', onCardPictureClick);
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
  }

  function hide(buttons, cards, photosLists, onCardPictureClick, pictures, onKeyDown) {

    if (clickedIndex) {
      cards[synchronizedIndex].classList.add('hidden');
      buttons[clickedIndex].classList.remove(ACTIVATED_PIN_CLASS);
      document.removeEventListener('keydown', onKeyDown);

      if (photosLists[synchronizedIndex].children.length > 1) {
        photosLists[synchronizedIndex].removeEventListener('click', onCardPictureClick);

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

  function flip(pictures) {

    if (pictures[synchronizedIndex].length > 1) {

      if (counter === pictures[synchronizedIndex].length - 1) {
        resetPictures(pictures);

        return;
      }

      showNextPicture(pictures);
    }
  }

  return {
    show: show,
    hide: hide,
    flip: flip
  };
})();
/*
    "Б20. Все файлы JS представляют собой отдельные модули в IIFE
    Экспорт значений производится через глобальную область видимости. Код вне модуля запрещён. Вне модуля могут располагаться комментарии и утилитные инструкции, такие как 'use strict';"

    В данном критерии регламентируется то, что все JS файлы представляют из себя модули IIFE, экспорт из них производится через глобальную область видимости.
    В нем никак не регламентируется оформление экспорта.
    Пример !== критерий.
*/
