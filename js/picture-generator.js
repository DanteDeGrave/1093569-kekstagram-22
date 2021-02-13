import {getArrayObjects} from './object-creator.js';

const photosList = document.querySelector('.pictures');
const photos = getArrayObjects();

const getPictureElement = (object) => {
  const templatePicture = document.querySelector('#picture').content;
  const picture = templatePicture.cloneNode(true);
  const pictureAddress = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureAddress.src = object.url;
  pictureComments.textContent = String(object.comments.length);
  pictureLikes.textContent = String(object.likes);

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

