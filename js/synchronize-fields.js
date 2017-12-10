'use strict';


(function () {

  window.synchronize = function (elementA, elementB, valuesA, valuesB, callback) {
    var valueIndex = valuesA.indexOf(elementA.value);
    callback(elementB, valuesB[valueIndex]);
  };
})();
