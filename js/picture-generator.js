import {getArrayObjects} from './object-creator.js';

const photosList = document.querySelector('.pictures');
const photos = getArrayObjects();

const getPictureElement = (object) => {
  const templatePicture = document.querySelector('#picture').content;
  const picture = templatePicture.cloneNode(true);

  picture.querySelector('.picture__img').src = object.url;
  picture.querySelector('.picture__comments').textContent = String(object.comments.length);
  picture.querySelector('.picture__likes').textContent = String(object.likes);

  return picture;
}



const getFragmentsPicture = (objects) => {
  const fragmentsPicture = document.createDocumentFragment();
  objects.forEach((item) => {
    fragmentsPicture.appendChild(getPictureElement(item));
  });
  return fragmentsPicture;
}

photosList.appendChild(getFragmentsPicture(photos));

