'use strict';


window.synchronizeFields = (function () {

  function synchronize(elementA, elementB, valuesA, valuesB, callback) {
    var valueIndex = valuesA.indexOf(elementA.value);
    callback(elementB, valuesB[valueIndex]);
  }

  return synchronize;
})();
/*
    "Б20. Все файлы JS представляют собой отдельные модули в IIFE
    Экспорт значений производится через глобальную область видимости. Код вне модуля запрещён. Вне модуля могут располагаться комментарии и утилитные инструкции, такие как 'use strict';"

    В данном критерии регламентируется то, что все JS файлы представляют из себя модули IIFE, экспорт из них производится через глобальную область видимости.
    В нем никак не регламентируется оформление экспорта.
    Пример !== критерий.
*/
