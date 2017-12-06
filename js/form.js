'use strict';


(function () {
  var userFormElements = document.querySelectorAll('.form__element');
  var roomsCapacitySelect = userFormElements[6].querySelector('select[name="capacity"]');
  var roomsQuantitySelect = userFormElements[5].querySelector('select[name="rooms"]');
  var timeInSelect = userFormElements[4].querySelector('select[name="timein"]');
  var timeOutSelect = userFormElements[4].querySelector('select[name="timeout"]');
  var housingPriceInput = userFormElements[3].querySelector('input[name="price"]');
  var housingTypeSelect = userFormElements[2].querySelector('select[name="type"]');

  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  housingTypeSelect.addEventListener('change', onHousingTypeSelectChange);
  roomsQuantitySelect.addEventListener('change', onRoomsQuantitySelectChange);


  function onTimeInSelectChange() {
    for (var i = 0; i < timeOutSelect.length; i++) {
      var timeInOption = timeInSelect.options[i];
      var timeOutOption = timeOutSelect.options[i];
      if (timeInOption.selected) {
        timeOutOption.selected = true;
      }
    }
  }

  function onTimeOutSelectChange() {
    for (var i = 0; i < timeOutSelect.length; i++) {
      var timeInOption = timeInSelect.options[i];
      var timeOutOption = timeOutSelect.options[i];
      if (timeOutOption.selected) {
        timeInOption.selected = true;
      }
    }
  }

  function onHousingTypeSelectChange() {
    var type = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    for (var i = 0; i < housingTypeSelect.length; i++) {
      var typeOption = housingTypeSelect.options[i];
      if (typeOption.selected) {
        housingPriceInput.setAttribute('min', type[typeOption.value]);
      }
    }
  }

  function onRoomsQuantitySelectChange() {
    for (var i = 0; i < roomsQuantitySelect.length; i++) {
      var quantity = roomsQuantitySelect.options[i];
      if (quantity.selected) {
        quantity = quantity.value;
      }
      switch (quantity) {
        case '1':
          roomsCapacitySelect.options[0].disabled = true;
          roomsCapacitySelect.options[1].disabled = true;
          roomsCapacitySelect.options[2].disabled = false;
          roomsCapacitySelect.options[3].disabled = true;
          roomsCapacitySelect.options[2].selected = true;
          break;
        case '2':
          roomsCapacitySelect.options[0].disabled = true;
          roomsCapacitySelect.options[1].disabled = false;
          roomsCapacitySelect.options[2].disabled = false;
          roomsCapacitySelect.options[3].disabled = true;
          roomsCapacitySelect.options[2].selected = true;
          break;
        case '3':
          roomsCapacitySelect.options[0].disabled = false;
          roomsCapacitySelect.options[1].disabled = false;
          roomsCapacitySelect.options[2].disabled = false;
          roomsCapacitySelect.options[3].disabled = true;
          roomsCapacitySelect.options[2].selected = true;
          break;
        case '100':
          roomsCapacitySelect.options[0].disabled = true;
          roomsCapacitySelect.options[1].disabled = true;
          roomsCapacitySelect.options[2].disabled = true;
          roomsCapacitySelect.options[3].disabled = false;
          roomsCapacitySelect.options[3].selected = true;
          break;
      }
    }
  }
})();
