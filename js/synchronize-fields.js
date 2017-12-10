'use strict';


window.synchronizeFields = (function () {

  function synchronize(elementA, elementB, valuesA, valuesB, callback) {
    var valueIndex = valuesA.indexOf(elementA.value);
    callback(elementB, valuesB[valueIndex]);
  }

  return {
    synchronize: synchronize
  };
})();
