import {isEscEvent} from './util.js';
import {activateFilter, deactivateFilter} from './image-redactor-effect.js'
import {selectFile} from './user-photo.js';
import {onHashtagChangeValue, onDescriptionInput, onHashtagInput} from './image-redactor-text.js';
import {setImageRedactorFormSubmit} from './api.js';

const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;
const PERCENT_COEFFICIENT = 100;
const imageUploadForm = document.querySelector('.img-upload__form');
const uploadImage = imageUploadForm.querySelector('.img-upload__input');
const modalRedactorImage = imageUploadForm.querySelector('.img-upload__overlay');
const modalRedactorCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadForm.querySelector('.scale__control--bigger');
const scaleControlInput = imageUploadForm.querySelector('.scale__control--value');
const uploadPreviewPhoto = imageUploadForm.querySelector('.img-upload__preview');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const description = imageUploadForm.querySelector('.text__description');
let scaleControlValueInt = parseInt(scaleControlInput.value);

const onModalRedactorEscKeydown = (evt) => {
  if (isEscEvent(evt) && document.activeElement !== hashtagInput && document.activeElement !== description) {
    modalRedactorClose();
  }
};

const onUploadFileInputClick = () => {
  modalRedactorOpen();
};

const onCloseButtonClick = () => {
  modalRedactorClose();
};

const modalRedactorOpen = () => {
  modalRedactorImage.classList.remove('hidden');
  selectFile();
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onModalRedactorEscKeydown);
  scaleControlSmaller.addEventListener('click',onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click',onScaleControlBiggerClick);
  hashtagInput.addEventListener('input',onHashtagInput);
  description.addEventListener('input', onDescriptionInput);
  activateFilter();
  scaleControlValueInt = parseInt(scaleControlInput.value);
  modalRedactorCloseButton.addEventListener('click',onCloseButtonClick);
};

const modalRedactorClose = () => {
  modalRedactorImage.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onModalRedactorEscKeydown);
  scaleControlSmaller.removeEventListener('click',onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click',onScaleControlBiggerClick);
  hashtagInput.removeEventListener('input',onHashtagInput);
  description.removeEventListener('input', onDescriptionInput);
  hashtagInput.removeEventListener('change',onHashtagChangeValue);
  deactivateFilter();
  uploadPreviewPhoto.style ='';
  uploadImage.value = '';
  uploadPreviewPhoto.querySelector('img').src = 'img/upload-default-image.jpg';
  imageUploadForm.reset();
  modalRedactorCloseButton.removeEventListener('click',modalRedactorClose);
};

const onScaleControlSmallerClick = () => {
  if (scaleControlValueInt !== MIN_VALUE_SCALE_CONTROL) {
    scaleControlBigger.disabled = false;
    scaleControlValueInt -= MIN_VALUE_SCALE_CONTROL;
    scaleControlInput.value = `${scaleControlValueInt}%`;
    uploadPreviewPhoto.style.transform = `scale(${scaleControlValueInt / PERCENT_COEFFICIENT})`;
  } else {
    scaleControlSmaller.disabled = true;
  }
};

const onScaleControlBiggerClick = () => {
  if (scaleControlValueInt !== MAX_VALUE_SCALE_CONTROL) {
    scaleControlSmaller.disabled = false;
    scaleControlValueInt += MIN_VALUE_SCALE_CONTROL;
    scaleControlInput.value = `${scaleControlValueInt}%`;
    uploadPreviewPhoto.style.transform = `scale(${scaleControlValueInt / PERCENT_COEFFICIENT})`;
  } else {
    scaleControlBigger.disabled = true;
  }
};

uploadImage.addEventListener('change', onUploadFileInputClick);
setImageRedactorFormSubmit(modalRedactorClose);
