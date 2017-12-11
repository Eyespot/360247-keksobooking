'use strict';


(function () {
  var userFormElements = document.querySelectorAll('.form__element');
  var roomsCapacitySelect = userFormElements[6].querySelector('select[name="capacity"]');
  var roomsQuantitySelect = userFormElements[5].querySelector('select[name="rooms"]');
  var timeInSelect = userFormElements[4].querySelector('select[name="timein"]');
  var timeOutSelect = userFormElements[4].querySelector('select[name="timeout"]');
  var housingPriceInput = userFormElements[3].querySelector('input[name="price"]');
  var housingTypeSelect = userFormElements[2].querySelector('select[name="type"]');
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['bugalo', 'flat', 'house', 'palace'];
  var PRICES = ['0', '1000', '5000', '10000'];
  var ROOMS_QUANTITIES = ['1', '2', '3', '100'];
  var ROOMS_CAPACITY = {
    '0': [true, true, false, true],
    '1': [true, false, false, true],
    '2': [false, false, false, true],
    '3': [true, true, true, false]
  };
  var synchronize = window.synchronizeFields;

  timeInSelect.addEventListener('change', function () {
    synchronize(timeInSelect, timeOutSelect, TIMES, TIMES, syncTimes);
  });

  timeOutSelect.addEventListener('change', function () {
    synchronize(timeOutSelect, timeInSelect, TIMES, TIMES, syncTimes);
  });

  housingTypeSelect.addEventListener('change', function () {
    synchronize(housingTypeSelect, housingPriceInput, TYPES, PRICES, syncHousingTypeWithMinPrice);
  });

  roomsQuantitySelect.addEventListener('change', function () {
    synchronize(roomsQuantitySelect, roomsCapacitySelect, ROOMS_QUANTITIES, ROOMS_CAPACITY, syncRoomsQuantityWithRoomsCapacity);
  });

  function syncTimes(element, value) {
    element.value = value;
  }

  function syncHousingTypeWithMinPrice(element, value) {
    element.min = value;
    if (element.value) {
      element.value = value;
    }
  }

  function syncRoomsQuantityWithRoomsCapacity(element, value) {
    for (var i = 0; i < element.options.length; i++) {
      element.options[i].disabled = value[i];
    }
    if (value[3]) {
      element.options[2].selected = true;
    } else {
      element.options[3].selected = true;
    }
  }
})();
