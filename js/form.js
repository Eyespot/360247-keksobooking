'use strict';


(function () {
  var USER_PIN_TOP_LOCATION_CORRECTION = window.util.USER_PIN_TOP_LOCATION_CORRECTION;
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var PRICES = ['0', '1000', '5000', '10000'];
  var ROOMS_QUANTITIES = ['1', '2', '3', '100'];
  var TITLE_INPUT_MINLENGTH = 30;
  var USER_PIN_START_LEFT = 50 + '%';
  var USER_PIN_START_TOP = 375 + 'px';

  var ROOMS_CAPACITY = {
    '0': [true, true, false, true],
    '1': [true, false, false, true],
    '2': [false, false, false, true],
    '3': [true, true, true, false]
  };

  var onChangeSynchronize = window.synchronizeFields;
  var userForm = document.querySelector('.notice__form');
  var userFormFields = userForm.querySelectorAll('.form__element');
  var roomsCapacitySelect = userFormFields[6].querySelector('select[name="capacity"]');
  var roomsQuantitySelect = userFormFields[5].querySelector('select[name="rooms"]');
  var timeInSelect = userFormFields[4].querySelector('select[name="timein"]');
  var timeOutSelect = userFormFields[4].querySelector('select[name="timeout"]');
  var housingPriceInput = userFormFields[3].querySelector('input[name="price"]');
  var housingTypeSelect = userFormFields[2].querySelector('select[name="type"]');
  var titleInput = userFormFields[0].querySelector('input[name="title"]');
  var reset = userForm.querySelector('button[class="form__reset"]');

  userForm.addEventListener('submit', onUserFormSubmit);

  if (window.util.checkBrowser() === 'Edge') {
    titleInput.addEventListener('change', onTitleInputChange);
  }

  timeInSelect.addEventListener('change', onTimeInSelectChange);

  timeOutSelect.addEventListener('change', onTimeOutSelectChange);

  housingTypeSelect.addEventListener('change', onHousingTypeSelectChange);

  roomsQuantitySelect.addEventListener('change', onRoomsQuantitySelectChange);

  reset.addEventListener('click', onResetClick);

  function onTitleInputChange() {
    if (titleInput.value.length < TITLE_INPUT_MINLENGTH) {
      var guideline = 'Пожалуйста, введите не менее 30 символов. Введено: ' + titleInput.value.length;
      titleInput.setCustomValidity(guideline);
    } else {
      titleInput.setCustomValidity('');
    }
  }

  function onFormSendSuccess() {
    userForm.reset();
    resetUserFormValues();

    userForm.appendChild(window.statusMessages.reflectSuccess());
  }

  function onResetClick(evt) {
    evt.preventDefault();
    userForm.reset();
    resetUserFormValues();
  }

  function resetUserFormValues() {
    window.map.ticketsFiltersContainer.reset();
    window.map.filterTickets();
    window.map.userPin.style.left = USER_PIN_START_LEFT;
    window.map.userPin.style.top = USER_PIN_START_TOP;

    window.uploadedPictures();

    onChangeSynchronize(housingTypeSelect, housingPriceInput, TYPES, PRICES, syncHousingTypeWithMinPrice);

    onChangeSynchronize(roomsQuantitySelect, roomsCapacitySelect, ROOMS_QUANTITIES, ROOMS_CAPACITY, syncRoomsQuantityWithRoomsCapacity);

    setAddressValue();
  }

  function onFormSendError(error) {
    document.querySelector('body').appendChild(window.statusMessages.reflectError('Не удалось разместить объявление. ' + error));
  }

  function setAddressValue() {
    var userPinAddress = window.map.getUserPinLocation();
    window.map.address.value = userPinAddress.x + ', ' + (userPinAddress.y + USER_PIN_TOP_LOCATION_CORRECTION);
  }

  function onUserFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), onFormSendSuccess, onFormSendError);
  }

  function syncTimes(element, value) {
    element.value = value;
  }

  function onTimeInSelectChange() {
    onChangeSynchronize(timeInSelect, timeOutSelect, TIMES, TIMES, syncTimes);
  }

  function onTimeOutSelectChange() {
    onChangeSynchronize(timeOutSelect, timeInSelect, TIMES, TIMES, syncTimes);
  }

  function syncHousingTypeWithMinPrice(element, value) {
    element.min = value;

    if (element.value) {
      element.value = null;
    }
  }

  function onHousingTypeSelectChange() {
    onChangeSynchronize(housingTypeSelect, housingPriceInput, TYPES, PRICES, syncHousingTypeWithMinPrice);
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

  function onRoomsQuantitySelectChange() {
    onChangeSynchronize(roomsQuantitySelect, roomsCapacitySelect, ROOMS_QUANTITIES, ROOMS_CAPACITY, syncRoomsQuantityWithRoomsCapacity);
  }

  window.userForm = userForm;
})();
