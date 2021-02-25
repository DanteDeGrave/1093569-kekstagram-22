import {isEscEvent} from './util.js';
import {getSliderOn, getSliderOff} from './image-redactor-effect.js'
import {validationDescription, validationHashtag} from './image-redactor-text.js';
import {setImageRedactorFormSubmit} from './api.js';

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
const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;


const onModalRedactorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    modalRedactorClose();
  }
}

const onInputEscFocusOut = (evt) => {
  if(isEscEvent(evt)) {
    evt.stopPropagation();
    evt.target.blur();
  }
}

const modalRedactorOpen = () => {
  modalRedactorImage.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onModalRedactorEscKeydown);
  scaleControlSmaller.addEventListener('click',onScaleControlSmaller);
  scaleControlBigger.addEventListener('click',onScaleControlBigger);
  hashtagInput.addEventListener('input',validationHashtag);
  description.addEventListener('input', validationDescription);
  hashtagInput.addEventListener('keydown', onInputEscFocusOut);
  description.addEventListener('keydown', onInputEscFocusOut);
  getSliderOn();
  scaleControlValueInt = parseInt(scaleControlInput.value);
  modalRedactorCloseButton.addEventListener('click',modalRedactorClose);
}

const modalRedactorClose = () => {
  modalRedactorImage.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onModalRedactorEscKeydown);
  scaleControlSmaller.removeEventListener('click',onScaleControlSmaller);
  scaleControlBigger.removeEventListener('click',onScaleControlBigger);
  hashtagInput.removeEventListener('input',validationHashtag);
  description.removeEventListener('input', validationDescription);
  hashtagInput.removeEventListener('keydown', onInputEscFocusOut);
  description.removeEventListener('keydown', onInputEscFocusOut);
  getSliderOff();
  uploadPreviewPhoto.style ='';
  uploadImage.value = '';
  imageUploadForm.reset();
}

const onScaleControlSmaller = () => {
  if (scaleControlValueInt !== MIN_VALUE_SCALE_CONTROL) {
    scaleControlBigger.disabled = false;
    scaleControlValueInt -= 25;
    scaleControlInput.value = `${scaleControlValueInt}%`;
    uploadPreviewPhoto.style.transform = `scale(${scaleControlValueInt / 100})`;
  } else {
    scaleControlSmaller.disabled = true;
  }
}

const onScaleControlBigger = () => {
  if (scaleControlValueInt !== MAX_VALUE_SCALE_CONTROL) {
    scaleControlSmaller.disabled = false;
    scaleControlValueInt += 25;
    scaleControlInput.value = `${scaleControlValueInt}%`;
    uploadPreviewPhoto.style.transform = `scale(${scaleControlValueInt / 100})`;
  } else {
    scaleControlBigger.disabled = true;
  }
}

uploadImage.addEventListener('change',modalRedactorOpen);
setImageRedactorFormSubmit(modalRedactorClose);

export {modalRedactorClose};

