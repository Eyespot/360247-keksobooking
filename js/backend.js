'use strict';


(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var OK_STATUS = 200;
  var HTTP_CONNECT_TIMEOUT = 2000;

  var HTTP_ERRORS = {
    400: 'Неверный запрос.',
    401: 'Требуется авторизация.',
    404: 'Данные не найдены.',
    418: 'I\'m a teapot.',
    500: 'Ошибка сервера.',
    other: 'Бинго! Неопределенная ошибка.'
  };

  function request(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function onHttpRequestLoad() {

      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(HTTP_ERRORS[xhr.status] || HTTP_ERRORS['other']);
      }

    });

    xhr.addEventListener('error', function onHttpRequestError() {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function onHttpRequestTimeout() {
      onError('Превышено время ожидания ответа. Проверьте интеренет соединение.');
    });

    xhr.timeout = HTTP_CONNECT_TIMEOUT;

    return xhr;
  }

  function load(onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  function save(data, onSuccess, onError) {
    var xhr = request(onSuccess, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save
  };
})();
