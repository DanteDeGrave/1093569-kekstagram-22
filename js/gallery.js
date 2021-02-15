import {getArrayObjects} from './object-creator.js';

const photosList = document.querySelector('.pictures');
const photos = getArrayObjects();

const renderPictures = (objects) => {
  const templatePicture = document.querySelector('#picture').content;
  const fragmentsPicture = document.createDocumentFragment();
  objects.forEach((element) => {
    const picture = templatePicture.querySelector('.picture').cloneNode(true);
    picture.querySelector('.picture__img').src = element.url;
    picture.querySelector('.picture__comments').textContent = String(element.comments.length);
    picture.querySelector('.picture__likes').textContent = String(element.likes);
    // picture.addEventListener('click', () => {
    //
    // });
    fragmentsPicture.appendChild(picture);
  });
  photosList.appendChild(fragmentsPicture);
}

renderPictures(photos);
