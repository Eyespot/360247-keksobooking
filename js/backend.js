'use strict';


(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var OK_STATUS = 200;
  var HTTP_CONNECTION_TIMEOUT = 20000;

  var HTTP_ERRORS = {
    400: 'Неверный запрос.',
    401: 'Требуется авторизация.',
    404: 'Данные не найдены.',
    418: 'I\'m a teapot.',
    500: 'Ошибка сервера.',
    other: 'Бинго! Неопределенная ошибка.'
  };

  function onHttpRequestLoad(onLoad, onError, xhr) {

    if (xhr.status === OK_STATUS) {
      onLoad(xhr.response);
    } else {
      onError(HTTP_ERRORS[xhr.status] || HTTP_ERRORS['other']);
    }

  }

  function onHttpRequestError(onError) {
    onError('Произошла ошибка соединения.');
  }

  function onHttpRequestTimeout(onError) {
    onError('Превышено время ожидания ответа. Проверьте интеренет соединение.');
  }

  function request(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', onHttpRequestLoad.bind(xhr, onLoad, onError, xhr));

    xhr.addEventListener('error', onHttpRequestError.bind(xhr, onError));

    xhr.addEventListener('timeout', onHttpRequestTimeout.bind(xhr, onError));

    xhr.timeout = HTTP_CONNECTION_TIMEOUT;

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
