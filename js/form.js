'use strict';


window.userForm = (function () {
  var userForm = document.querySelector('.notice__form');
  var userFormFields = userForm.querySelectorAll('.form__element');
  var roomsCapacitySelect = userFormFields[6].querySelector('select[name="capacity"]');
  var roomsQuantitySelect = userFormFields[5].querySelector('select[name="rooms"]');
  var timeInSelect = userFormFields[4].querySelector('select[name="timein"]');
  var timeOutSelect = userFormFields[4].querySelector('select[name="timeout"]');
  var housingPriceInput = userFormFields[3].querySelector('input[name="price"]');
  var housingTypeSelect = userFormFields[2].querySelector('select[name="type"]');
  var titleInput = userFormFields[0].querySelector('input[name="title"]');
  var USER_PIN_TOP_LOCATION_CORRECTION = 32 + 16;
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
  var onChangeSynchronize = window.synchronizeFields;

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), onFormSendSuccess, onFormSendError);
  });

  if (window.util.checkBrowser() === 'Edge') {
    userForm.reset();
    titleInput.addEventListener('change', onEdgeTitleLengthCheck);
  }

  timeInSelect.addEventListener('change', function () {
    onChangeSynchronize(timeInSelect, timeOutSelect, TIMES, TIMES, syncTimes);
  });

  timeOutSelect.addEventListener('change', function () {
    onChangeSynchronize(timeOutSelect, timeInSelect, TIMES, TIMES, syncTimes);
  });

  housingTypeSelect.addEventListener('change', function () {
    onChangeSynchronize(housingTypeSelect, housingPriceInput, TYPES, PRICES, syncHousingTypeWithMinPrice);
  });

  roomsQuantitySelect.addEventListener('change', function () {
    onChangeSynchronize(roomsQuantitySelect, roomsCapacitySelect, ROOMS_QUANTITIES, ROOMS_CAPACITY, syncRoomsQuantityWithRoomsCapacity);
  });

  function onEdgeTitleLengthCheck() {
    if (titleInput.value.length < 30) {
      var guideline = 'Пожалуйста, введите не менее 30 символов. Введено: ' + titleInput.value.length;
      titleInput.setCustomValidity(guideline);
    } else {
      titleInput.setCustomValidity('');
    }
  }

  function onFormSendSuccess() {
    userForm.reset();
    window.map.ticketsFiltersContainer.reset();
    window.map.filterTickets();
    window.map.userPin.style.top = 375 + 'px';
    window.map.userPin.style.left = 50 + '%';
    setAddressValue();
    onChangeSynchronize(housingTypeSelect, housingPriceInput, TYPES, PRICES, syncHousingTypeWithMinPrice);
    userForm.appendChild(window.statusMessages.successMessage());
  }

  function onFormSendError(error) {
    document.querySelector('body').appendChild(window.statusMessages.errorMessage('Не удалось разместить объявление. ' + error));
  }

  function setAddressValue() {
    var userPinAddress = window.map.getUserPinLocation();
    window.map.address.value = userPinAddress.x + ', ' + (userPinAddress.y + USER_PIN_TOP_LOCATION_CORRECTION);
  }

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

  return userForm;
})();
