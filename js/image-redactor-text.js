import {validationStringLength} from './util.js';

const hashtagInput = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const regular = /^#[a-zA-Zа-яА-Я\d]{1,19}\s?$/;
const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
let arrayHashTags = [];

const validationHashtag = () => {
  arrayHashTags = hashtagInput.value.trim().toLowerCase().split(/ +/g);
  const errors = [];
  arrayHashTags.forEach((element, index,array)=>{
    if (element.length >= HASHTAG_MAX_LENGTH) {
      errors.push('Хештег не должен превышать 20 допустимых символов');
    } else if (array.indexOf(element) !== array.lastIndexOf(element)){
      errors.push(`Хештеги ${array[array.indexOf(element)]} и ${array[array.lastIndexOf(element)]} не должны быть одинаковы`);
    } else if (array.length > HASHTAG_MAX_COUNT ) {
      errors.push('Должно быть не более 5и хештегов');
    } else if (!regular.exec(element) && element !== '') {
      errors.push('Хештег должен начинаться с # и содержать только буквы и числа и не должен состоять только из одной решетки');
    }
  });

  if (errors.length > 0) {
    hashtagInput.style.borderColor = 'red';
    hashtagInput.style.color = 'red';
  } else {
    hashtagInput.style.borderColor = '';
    hashtagInput.style.color = '';
  }
  hashtagInput.setCustomValidity(errors[0] || '');
  hashtagInput.reportValidity();
  hashtagInput.addEventListener('change',joinInputHashTagValue);
}

const joinInputHashTagValue = () => {hashtagInput.value = arrayHashTags.join(' ')}

const validationDescription = () => {
  if (validationStringLength(description.value, DESCRIPTION_MAX_LENGTH)) {
    description.setCustomValidity(`Вы превысили допустимое значение на ${description.value.length - DESCRIPTION_MAX_LENGTH} символов !`);
    description.style.borderColor = 'red';
    description.style.color = 'red';
  } else {
    description.setCustomValidity('');
    description.style.borderColor = '';
    description.style.color = '';
  }
  description.reportValidity();
}

export {validationHashtag, validationDescription, joinInputHashTagValue};
