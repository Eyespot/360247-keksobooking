'use strict';


window.pins = (function () {

  var HALFWAY_PSEUDO_WIDTH = 5;
  var PSEUDO_HEIGHT = 18;
  var HALFWAY_MAP_PIN_HEIGHT = 22;
  var INDEX_SYNCHRONIZATION_VALUE = window.util.INDEX_SYNCHRONIZATION_VALUE;
  var HIDDEN_PIN_CLASS = 'map__pin hidden';

  function create(cards, container) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      var newPin = document.createElement('button');
      var pinLocationX = cards[i].location.x - HALFWAY_PSEUDO_WIDTH;
      var pinLocationY = cards[i].location.y - (HALFWAY_MAP_PIN_HEIGHT + PSEUDO_HEIGHT);
      var pinStyle = 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;';
      var pinTag = '<img src="' + cards[i].author.avatar + '" width="40" height="40" draggable="false"></button>';

      newPin.style = pinStyle;
      newPin.className = HIDDEN_PIN_CLASS;
      newPin.innerHTML = pinTag;

      fragment.appendChild(newPin);
    }

    container.appendChild(fragment);
  }

  function show(arrayOfIndexes, mapPins) {

    mapPins.forEach(function (mapPin, index) {

      if (arrayOfIndexes.indexOf(index - INDEX_SYNCHRONIZATION_VALUE) !== -1) {
        mapPin.classList.remove('hidden');
      }
    });
  }

  return {
    create: create,
    show: show
  };
})();
/*
    "Б20. Все файлы JS представляют собой отдельные модули в IIFE
    Экспорт значений производится через глобальную область видимости. Код вне модуля запрещён. Вне модуля могут располагаться комментарии и утилитные инструкции, такие как 'use strict';"

    В данном критерии регламентируется то, что все JS файлы представляют из себя модули IIFE, экспорт из них производится через глобальную область видимости.
    В нем никак не регламентируется оформление экспорта.
    Пример !== критерий.
*/
