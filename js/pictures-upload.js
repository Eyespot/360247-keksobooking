'use strict';


(function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var userAvatarInput = document.querySelector('input[id="avatar"]');
  var userAvatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var userAvatarPreview = document.querySelector('.notice__preview img');

  var userPicturesInput = document.querySelector('input[id="images"]');
  var userPicturesDropZone = document.querySelector('.form__photo-container .drop-zone');
  var userPicturesPreviewArea = document.querySelector('.form__photo-container');

  var reset = document.querySelector('button[class="form__reset"]');

  userAvatarInput.name = 'avatar';

  userPicturesInput.name = 'images';
  userPicturesInput.multiple = true;
  userPicturesPreviewArea.style.width = '240px';

  userAvatarInput.addEventListener('change', onUserAvatarInputChange);

  userPicturesInput.addEventListener('change', onPicturesInputChange);

  userAvatarDropZone.addEventListener('dragenter', onUserAvatarDropZoneDragenter);

  userAvatarDropZone.addEventListener('dragover', onUserAvatarDropZoneDragover);

  userAvatarDropZone.addEventListener('drop', onUserAvatarDropZoneDrop);

  userAvatarDropZone.addEventListener('dragleave', onUserAvatarDropZoneDragleave);

  userPicturesDropZone.addEventListener('dragenter', onUserPicturesDropZoneDragenter);

  userPicturesDropZone.addEventListener('dragover', onUserPicturesDropZoneDragover);

  userPicturesDropZone.addEventListener('drop', onUserPicturesDropZoneDrop);

  userPicturesDropZone.addEventListener('dragleave', onUserPicturesDropZoneDragleave);

  reset.addEventListener('click', onResetClick);

  function onUserAvatarInputChange() {
    displayAvatarPreview(userAvatarInput.files[0]);
  }

  function onPicturesInputChange() {
    [].forEach.call(userPicturesInput.files, displayPicturesPreview);
  }

  function onUserAvatarDropZoneDragenter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = 'lightgreen';
  }

  function onUserAvatarDropZoneDragover(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }

  function onUserAvatarDropZoneDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    displayAvatarPreview(evt.dataTransfer.files[0]);
    evt.target.style.backgroundColor = '';
  }

  function onUserAvatarDropZoneDragleave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  }

  function onUserPicturesDropZoneDragenter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = 'lightgreen';
  }

  function onUserPicturesDropZoneDragover(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }

  function onUserPicturesDropZoneDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    [].forEach.call(evt.dataTransfer.files, displayPicturesPreview);
    evt.target.style.backgroundColor = '';
  }

  function onUserPicturesDropZoneDragleave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  }

  function onAvatarLoad(reader) {
    userAvatarPreview.src = reader.result;
    userAvatarPreview.height = '66';
    userAvatarPreview.width = '60';
  }

  function displayAvatarPreview(photo) {
    var file = photo;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {

      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();
      var context = reader;

      reader.addEventListener('load', onAvatarLoad.bind(context, reader));
      reader.readAsDataURL(file);
    }
  }

  function onPicturesLoad(reader) {
    var image = document.createElement('IMG');
    image.width = '80';
    userPicturesPreviewArea.appendChild(image);
    image.src = reader.result;
  }

  function displayPicturesPreview(photo) {
    var file = photo;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {

      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();
      var context = reader;

      reader.addEventListener('load', onPicturesLoad.bind(context, reader));
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

  function onResetClick() {
    resetPreviews();
  }

  window.uploadedPictures = resetPreviews;
})();
