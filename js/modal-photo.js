import {isEscEvent} from './util.js';

const modalPhoto = document.querySelector('.big-picture');
const modalPhotoImg = modalPhoto.querySelector('.big-picture__img').querySelector('img');
const modalPhotoLikes = modalPhoto.querySelector('.likes-count');
const modalPhotoDescription = modalPhoto.querySelector('.social__caption');
const modalPhotoCommentsCount = modalPhoto.querySelector('.comments-count');
const modalPhotoCommentsList = modalPhoto.querySelector('.social__comments');
const modalButtonCancel = modalPhoto.querySelector('.big-picture__cancel');

const onPopUpEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeModal();
  }
}

const closeModal = () => {
  modalPhoto.classList.add('hidden');
  document.removeEventListener('keydown',onPopUpEscKeydown);
  modalPhoto.querySelector('.social__comment-count').classList.remove('hidden');
  modalPhoto.querySelector('.social__comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

const openModal = () => {
  modalPhoto.classList.remove('hidden');
  document.addEventListener('keydown',onPopUpEscKeydown);
  modalPhoto.querySelector('.social__comment-count').classList.add('hidden');
  modalPhoto.querySelector('.social__comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
}

const renderModalPicture = (object) => {
  openModal();

  modalPhotoImg.src = object.url;
  modalPhotoImg.alt = '';
  modalPhotoLikes.textContent = String(object.likes);
  modalPhotoCommentsCount.textContent = String(object.comments.length);
  modalPhotoDescription.textContent = object.description;
  modalPhotoCommentsList.innerHTML = '';

  if (object.comments.length > 0) {
    object.comments.forEach((element) => {
      const item = document.createElement('li');
      item.classList.add('social__comment');
      item.innerHTML = `<img class="social__picture" src="${element.avatar}" alt="${element.name}" width="35" height="35">
      <p class="social__text">${element.message}</p>`;
      modalPhotoCommentsList.appendChild(item);
    });
  }

  modalButtonCancel.addEventListener('click', () =>{
    closeModal();
  });

}

export {renderModalPicture};
