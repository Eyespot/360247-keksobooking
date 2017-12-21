'use strict';


window.uploadedPictures = (function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var userAvatarInput = document.querySelector('input[id="avatar"]');
  var userAvatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var userAvatarPreview = document.querySelector('.notice__preview img');

  var userPicturesInput = document.querySelector('input[id="images"]');
  var userPicturesDropZone = document.querySelector('.form__photo-container .drop-zone');
  var userPicturesPreviewArea = document.querySelector('.form__photo-container');

  userPicturesInput.multiple = true;
  userPicturesPreviewArea.style.width = '240px';


  userAvatarInput.addEventListener('change', function () {
    displayAvatarPreview(userAvatarInput.files[0]);
  });

  userPicturesInput.addEventListener('change', function () {
    [].forEach.call(userPicturesInput.files, displayPicturesPreview);
  });

  userAvatarDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = 'lightgreen';
  });

  userAvatarDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  });

  userAvatarDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    displayAvatarPreview(evt.dataTransfer.files[0]);
    evt.target.style.backgroundColor = '';
  });

  userAvatarDropZone.addEventListener('dragleave', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  userPicturesDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = 'lightgreen';
  });

  userPicturesDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  });

  userPicturesDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    [].forEach.call(evt.dataTransfer.files, displayPicturesPreview);
    evt.target.style.backgroundColor = '';
  });

  userPicturesDropZone.addEventListener('dragleave', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  function displayAvatarPreview(photo) {
    var file = photo;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {

      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userAvatarPreview.src = reader.result;
        userAvatarPreview.height = '66';
        userAvatarPreview.width = '60';
      });
      reader.readAsDataURL(file);
    }
  }

  function displayPicturesPreview(photo) {
    var file = photo;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {

      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var image = document.createElement('IMG');
        image.width = '80';
        userPicturesPreviewArea.appendChild(image);
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  function resetPreviews() {
    userAvatarPreview.src = 'img/muffin.png';
    userAvatarPreview.width = '40';
    userAvatarPreview.height = '44';

    while (userPicturesPreviewArea.children.length > 1) {
      userPicturesPreviewArea.removeChild(userPicturesPreviewArea.lastChild);
    }
  }

  return resetPreviews;
})();
