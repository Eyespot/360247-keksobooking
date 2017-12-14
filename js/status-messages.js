'use strict';


window.statusMessages = (function () {
  var closeButton = document.querySelector('template').content.querySelector('button.popup__close').cloneNode(true);
  var errorColor = '#ff5635';
  var successColor = '#10662a';
  var message = document.createElement('div');
  var title = document.createElement('h2');
  var info = document.createElement('p');

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
  closeButton.style.opacity = '0.5';

  closeButton.addEventListener('click', function () {
    message.parentNode.removeChild(message);
  });

  function createErrorMessage(errorMessage) {
    message.style.top = '50%';
    message.style.borderColor = errorColor;
    title.style.color = errorColor;
    title.textContent = 'Уууупс ¯\\_(ツ)_/¯';
    info.textContent = errorMessage;

    return message;
  }

  function createSuccessMessage() {
    message.style.top = '50%';
    message.style.borderColor = successColor;
    title.style.color = successColor;
    title.textContent = 'Готово!';
    info.textContent = 'Ваше объявление отправлено на модерацию';

    return message;
  }

  return {
    errorMessage: createErrorMessage,
    successMessage: createSuccessMessage
  };
})();
