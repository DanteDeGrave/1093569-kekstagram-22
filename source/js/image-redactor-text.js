import {validateStringLength} from './util.js';

const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const hashtagInput = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const regular = /^#[a-zA-Zа-яА-Я\d]{1,19}\s?$/;
const warning = {
  same: 'хештеги не должны быть одинаковы',
  limit: 'хештег не должен превышать 20 допустимых символов',
  regulation: 'хештег должен начинаться с # и содержать только буквы и числа и не должен состоять только из одной решетки',
  quantity: 'должно быть не более 5и хештегов',
};
let arrayHashTags = [];

const onHashtagInput = () => {
  arrayHashTags = hashtagInput.value.trim().toLowerCase().split(/ +/g);
  const errors = [];
  arrayHashTags.forEach((element, index, array) => {
    if (element.length >= HASHTAG_MAX_LENGTH && !errors.includes(warning.limit)) {
      errors.push(warning.limit);
    } else if (array.indexOf(element) !== array.lastIndexOf(element) && !errors.includes(warning.same)) {
      errors.push(warning.same);
    } else if (!regular.exec(element) && element !== '' && !errors.includes(warning.regulation)) {
      errors.push(warning.regulation);
    }
  });
  if (arrayHashTags.length > HASHTAG_MAX_COUNT && !errors.includes(warning.quantity)) {
    errors.push(warning.quantity);
  }
  if (errors.length) {
    hashtagInput.style.borderColor = 'red';
    hashtagInput.style.color = 'red';
  } else {
    hashtagInput.style.borderColor = '';
    hashtagInput.style.color = '';
  }
  hashtagInput.setCustomValidity(errors.join(', ') || '');
  hashtagInput.reportValidity();
  hashtagInput.addEventListener('change',onHashtagChangeValue);
};

const onHashtagChangeValue = () => {
  hashtagInput.value = arrayHashTags.join(' ')
};

const onDescriptionInput = () => {
  if (validateStringLength(description.value, DESCRIPTION_MAX_LENGTH)) {
    description.setCustomValidity(`Вы превысили допустимое значение на ${description.value.length - DESCRIPTION_MAX_LENGTH} символов !`);
    description.style.borderColor = 'red';
    description.style.color = 'red';
  } else {
    description.setCustomValidity('');
    description.style.borderColor = '';
    description.style.color = '';
  }
  description.reportValidity();
};

export {onHashtagInput, onDescriptionInput, onHashtagChangeValue};
