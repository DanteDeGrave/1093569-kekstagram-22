'use strict';

const NAMES = [
  'Вова',
  'Петя',
  'Саша',
  'Наташа',
  'Оля',
  'Витя',
]
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]
const ids = [];
const arrayObjects = [];

const getRandomIntNumber = function (min, max) {
  if (min <= max) {
    //Код частично взят из источника: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return alert('Минимальное значение должно быть меньше или рано максимальному');
}

// const checkLengthString = function (string, maxLength) {
//   return string.length <= maxLength
// }

const checkAvailability = function (arr,val) {
  return arr.some(function (arrVal){
    return val === arrVal;
  })
}

const getIdNumber = function genIdNumber() {
  let id = getRandomIntNumber(1, ids.length + 100);
  if (!checkAvailability(ids, id)) {
    ids.push(id);
    return id;
  } else {
    genIdNumber();
  }
}

const getComment = function () {
  const commentsArray = [];
  for (let i = 0; i < getRandomIntNumber (1, 3); i++) {
    commentsArray.push(getCommentaries());
  }
  return commentsArray;
}

const getArrayElements = function (array) {
  return array[getRandomIntNumber(0, array.length - 1)];
}

const getObjects = function (index) {
  return {
    id: index,
    url:'photos/' + index + '.jpg',
    description: 'Иллюстрация',
    likes: getRandomIntNumber (15, 200),
    comments: getComment(),
  }
}

const getCommentaries = function () {
  return {
    id: getIdNumber(),
    avatar: 'img/avatar-' + getRandomIntNumber(1, 6) +'.svg',
    message: getArrayElements(COMMENTS),
    name: getArrayElements(NAMES),
  }
}

for (let i = 1; i <= 25; i++) {
  arrayObjects.push(getObjects(i));
}
