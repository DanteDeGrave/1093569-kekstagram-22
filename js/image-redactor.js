import {isEscEvent} from './util.js';
import {getSliderOn, getSliderOff} from './image-redactor-effects.js'

const imageUploadForm = document.querySelector('.img-upload__form');
const uploadImage = imageUploadForm.querySelector('.img-upload__input');
const modalRedactorImage = imageUploadForm.querySelector('.img-upload__overlay');
const modalRedactorCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadForm.querySelector('.scale__control--bigger');
const scaleControlInput = imageUploadForm.querySelector('.scale__control--value');
const uploadPreviewPhoto = imageUploadForm.querySelector('.img-upload__preview');
let scaleControlValueInt = parseInt(scaleControlInput.value);
const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;


const onModalRedactorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    modalRedactorClose();
  }
}

const modalRedactorOpen = () => {
  modalRedactorImage.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onModalRedactorEscKeydown);
  scaleControlSmaller.addEventListener('click',onScaleControlSmaller);
  scaleControlBigger.addEventListener('click',onScaleControlBigger);
  getSliderOn();
}

const modalRedactorClose = () => {
  modalRedactorImage.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onModalRedactorEscKeydown);
  scaleControlSmaller.removeEventListener('click',onScaleControlSmaller);
  scaleControlBigger.removeEventListener('click',onScaleControlBigger);
  getSliderOff();
  uploadImage.value = '';
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

uploadImage.addEventListener('change', () => {
  modalRedactorOpen();
});

modalRedactorCloseButton.addEventListener('click', () =>{
  modalRedactorClose();
});

