/* global _:readonly */
import {renderModalPicture} from './modal-photo.js';
import {filter} from './filter.js';

const FILTER_ACTIVE_CLASS = 'img-filters__button--active';
const RENDER_DELAY = 500;
const photosList = document.querySelector('.pictures');
const imgFilter = document.querySelector('.img-filters');

const cleanGallery = () => {
  const pictureItem = photosList.querySelectorAll('.picture');
  pictureItem.forEach((element) => {
    element.remove();
  });
};

const renderPicturesContent = (pictures) => {
  renderPictures(pictures);
  imgFilter.classList.remove('img-filters--inactive');
  const debounced = _.debounce((id) => {
    cleanGallery();
    renderPictures(filter[id](pictures))
  }, RENDER_DELAY);

  imgFilter.addEventListener('click', (evt) => {
    const targetClassList = evt.target.classList;
    if (!targetClassList.contains('img-filters__button') || targetClassList.contains(FILTER_ACTIVE_CLASS)) {
      return;
    }
    imgFilter.querySelector('.img-filters__button--active').classList.remove(FILTER_ACTIVE_CLASS);
    targetClassList.add(FILTER_ACTIVE_CLASS);
    debounced(evt.target.id);
  });
};

const renderPictures = (objects) => {
  const templatePicture = document.querySelector('#picture').content;
  const fragmentsPicture = document.createDocumentFragment();
  objects.forEach((element) => {
    const picture = templatePicture.querySelector('.picture').cloneNode(true);
    picture.querySelector('.picture__img').src = element.url;
    picture.querySelector('.picture__comments').textContent = String(element.comments.length);
    picture.querySelector('.picture__likes').textContent = String(element.likes);
    picture.addEventListener('click', () => {
      renderModalPicture(element);
    });
    fragmentsPicture.appendChild(picture);
  });
  photosList.appendChild(fragmentsPicture);
};

export {renderPictures, renderPicturesContent};
