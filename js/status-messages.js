'use strict';


window.statusMessages = (function () {
  var closeButton = document.querySelector('template').content.querySelector('button.popup__close').cloneNode(true);
  var errorColor = '#ff5635';
  var successColor = '#10662a';
  var message = document.createElement('div');
  var title = document.createElement('h2');
  var info = document.createElement('p');

  closeButton.addEventListener('click', onMessageClose);

  message.appendChild(title);
  message.appendChild(info);
  message.appendChild(closeButton);

  message.className = 'popup-message';
  message.style.position = 'fixed';
  message.style.left = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.width = '900px';
  message.style.height = '200px';
  message.style.padding = '25px 15px';
  message.style.textAlign = 'center';
  message.style.backgroundColor = 'rgba(229, 226, 190, 0.9)';
  message.style.border = '12px ridge #e46b15';
  message.style.borderRadius = '5px';
  message.style.zIndex = '1';

  title.style.fontSize = '35px';

  info.style.margin = '0';
  info.style.fontSize = '20px';

  closeButton.style.top = '0';
  closeButton.style.height = '40px';
  closeButton.style.opacity = '0.5';

  function onMessageEscPress(evt) {
    window.util.isEscEvent(evt, onMessageClose);
  }

  function onMessageClose() {
    document.removeEventListener('keydown', onMessageEscPress);
    message.parentNode.removeChild(message);
  }

  function reflectError(errorMessage) {
    message.style.top = '50%';
    message.style.borderColor = errorColor;

    title.style.color = errorColor;
    title.textContent = 'Уууупс ¯\\_(ツ)_/¯';

    info.textContent = errorMessage;
    document.addEventListener('keydown', onMessageEscPress);

    return message;
  }

  function reflectSuccess() {
    message.style.top = '50%';
    message.style.borderColor = successColor;

    title.style.color = successColor;
    title.textContent = 'Готово!';

    info.textContent = 'Ваше объявление отправлено на модерацию';
    document.addEventListener('keydown', onMessageEscPress);

    return message;
  }

  return {
    reflectError: reflectError,
    reflectSuccess: reflectSuccess
  };
})();
/*
    "Б20. Все файлы JS представляют собой отдельные модули в IIFE
    Экспорт значений производится через глобальную область видимости. Код вне модуля запрещён. Вне модуля могут располагаться комментарии и утилитные инструкции, такие как 'use strict';"

    В данном критерии регламентируется то, что все JS файлы представляют из себя модули IIFE, экспорт из них производится через глобальную область видимости.
    В нем никак не регламентируется оформление экспорта.
    Пример !== критерий.
*/
