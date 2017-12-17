'use strict';


window.backend = (function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  function request(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var httpErrors = {
      400: 'Неверный запрос.',
      401: 'Требуется авторизация.',
      404: 'Данные не найдены.',
      418: 'I\'m a teapot.',
      500: 'Ошибка сервера.'
    };

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(httpErrors[xhr.status]);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа. Проверьте интеренет соединение.');
    });

    xhr.timeout = 20000;

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

  return {
    load: load,
    save: save
  };
})();
