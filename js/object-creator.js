import {getIdNumber} from './utils.js';
import {getArrayElements} from './utils.js';
import {getRandomIntNumber} from './utils.js';

const NAMES = [
  'Вова',
  'Петя',
  'Саша',
  'Наташа',
  'Оля',
  'Витя',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const arrayObjects = [];

const getObjects = (index) => {
  return {
    id: index,
    url:'photos/' + index + '.jpg',
    description: 'Иллюстрация',
    likes: getRandomIntNumber (15, 200),
    comments: getComment(),
  }
}

const getComment = () => {
  const commentsArray = [];
  for (let i = 0; i < getRandomIntNumber (1, 3); i++) {
    commentsArray.push(getCommentaries());
  }
  return commentsArray;
}

const getCommentaries = () => {
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
