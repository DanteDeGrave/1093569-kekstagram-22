import {validationStringLength} from './util.js';

const hashtagInput = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const regular = /^#[a-zа-яё0-9]{1,19}/i;
const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;



const validationHashtag = () => {
  let arrayHashTags = hashtagInput.value.trim().toLowerCase().split(' ');
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
  hashtagInput.setCustomValidity(errors[0] || '');
  hashtagInput.reportValidity();
}

const validationDescription = () => {
  if (validationStringLength(description.value, DESCRIPTION_MAX_LENGTH)) {
    description.setCustomValidity(`Длинна комментария не должна превышать ${DESCRIPTION_MAX_LENGTH} символов`);
  } else {
    description.setCustomValidity('');
  }
  description.reportValidity();
}

export {validationHashtag, validationDescription};
