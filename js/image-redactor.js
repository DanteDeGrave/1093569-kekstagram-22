import {isEscEvent} from './util.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const uploadImage = imageUploadForm.querySelector('.img-upload__input');
const modalRedactorImage = imageUploadForm.querySelector('.img-upload__overlay');
const modalRedactorCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const scaleControlSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imageUploadForm.querySelector('.scale__control--value');
// const uploadPreviewPhoto = imageUploadForm.querySelector('.img-upload__preview');
let scaleControlValueInt = parseInt(scaleControlValue.value);
// const MIN_VALUE_SCALE_CONTROL = 25;
// const MAX_VALUE_SCALE_CONTROL = 100;


const onModalRedactorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    modalRedactorClose();
  }
}

const modalRedactorOpen = () => {
  modalRedactorImage.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onModalRedactorEscKeydown);
}

const modalRedactorClose = () => {
  modalRedactorImage.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onModalRedactorEscKeydown);
  uploadImage.value = '';
}

const onScaleControlSmaller = () => {
  scaleControlSmaller.addEventListener('click', ()=>{
    scaleControlValueInt -= 25;
    scaleControlValue.value = `${scaleControlValueInt}%`;
  });
}

const onScaleControlBigger = () => {
  scaleControlBigger.addEventListener('click', ()=>{
    scaleControlValueInt += 25;
    scaleControlValue.value = `${scaleControlValueInt}%`;
  });
}

uploadImage.addEventListener('change', () => {
  modalRedactorOpen();
  onScaleControlSmaller();
  onScaleControlBigger();
});

modalRedactorCloseButton.addEventListener('click', () =>{
  modalRedactorClose();
});
