'use strict';


(function () {

  function synchronize(elementA, elementB, valuesA, valuesB, callback) {
    var valueIndex = valuesA.indexOf(elementA.value);
    callback(elementB, valuesB[valueIndex]);
  }

  window.synchronizeFields = synchronize;
})();
